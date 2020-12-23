import { toast } from 'react-toastify';
import SetProtocol from 'setprotocol.js';
import promisify from 'tiny-promisify';
import Web3 from 'web3';
import { Provider } from 'web3/providers';
import setupWalletLink from '@utils/walletLink';
import { setupWalletConnectAsync, setupWalletConnectSync } from '@utils/walletConnect';
import { ledgerEthereumBrowserClientFactoryAsync, LedgerSubprovider } from '@0x/subproviders';
import ProviderEngine from 'web3-provider-engine';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc';

import { store } from '../store';
import { initializeSetProtocol } from '@actions/setProtocolActions';
import { initializeSetJS } from '@actions/setJSActions';
import {
  receiveAccount,
  selectProviderType,
  setCurrentNetworkId,
  updateLoginStatus,
  logOut,
  setLedgerPath,
} from '@actions/web3Actions';
import {
  SET_PROTOCOL_CONFIG,
  WEB3_PROVIDERS,
  ETHEREUM_NETWORK_IDS,
  LEDGER_PATHS,
  SUBDOMAIN,
} from '@constants/index';
import { ILoginData } from '@typings/index';
import i18n from '../i18n';

export const ledgerEngine = (function () {
  // Instance stores a reference to the Singleton
  const instances: any = {};

  function init(networkId: string, ledgerPath: string) {
    // Singleton

    return {
      // Public methods and variables
      configure: function () {
        const engine = new ProviderEngine();
        const ledgerConfig = {
          ledgerEthereumClientFactoryAsync: ledgerEthereumBrowserClientFactoryAsync,
          networkId: Number(networkId),
          baseDerivationPath: ledgerPath,
        };
        const ledgerProvider = new LedgerSubprovider(ledgerConfig);
        engine.on('error', () => {
          // Do nothing on connection error
        });
        engine.addProvider(ledgerProvider);
        engine.addProvider(
          new RpcSubprovider({
            rpcUrl: `${process.env.INFURA_API_HOST}${process.env.INFURA_API_KEY}`,
          }),
        );
        engine.start();

        return engine;
      },
    };
  }
  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function (ledgerPath: string, networkId: string) {
      const key = `${networkId}-${ledgerPath}`;
      if (!(key in instances)) {
        instances[key] = init(networkId, ledgerPath).configure();
      } else {
        if (!instances[key].isRunning()) {
          instances[key].start();
        }
      }

      return instances[key];
    },

    stopInstance: function (ledgerPath: string, networkId: string) {
      const key = `${networkId}-${ledgerPath}`;
      if (key in instances && instances[key].isRunning()) {
        instances[key].stop();
      }
    },
  };
})();

/**
 * initSetProtocol
 * Initializes setProtocol with Set Protocol addresses from our process.env, and stores it in Redux.
 */
export const initSetProtocol = (currentProvider: Provider) => {
  const setProtocolConfig = SET_PROTOCOL_CONFIG;
  const setProtocol = new SetProtocol(currentProvider, setProtocolConfig);
  store.dispatch(initializeSetProtocol(setProtocol));
};

/**
 * subscribeToProviderUpdates
 * Subscribes to any account or network changes made with provider.
 */
const subscribeToProviderUpdates = (ethereum: any) => {
  if (ethereum && ethereum._events && !ethereum._events.accountsChanged && ethereum.on) {
    const web3Instance = new Web3(ethereum);
    ethereum.on('accountsChanged', (accounts: string[]) => {
      const {
        web3: { account },
      } = store.getState();

      if (accounts && accounts[0] && account) {
        const newAccount = web3Instance.utils.toChecksumAddress(accounts[0]);
        if (account !== newAccount) {
          toast(i18n.t('components:web3.changed-account'));
        }
        store.dispatch(receiveAccount(newAccount));
      } else {
        ethereum.removeAllListeners();
        store.dispatch(logOut());
      }
    });
    ethereum.on('networkChanged', (networkId: string) => {
      store.dispatch(setCurrentNetworkId(networkId));
    });
  }
};

const initWeb3Wallet = (
  accounts: string[],
  web3Instance: Web3,
  networkVersion = ETHEREUM_NETWORK_IDS.MAIN_NET_ID,
  providerType: string,
) => {
  const account = web3Instance.utils.toChecksumAddress(accounts[0]);
  store.dispatch(receiveAccount(account));
  store.dispatch(selectProviderType(providerType));
  store.dispatch(setCurrentNetworkId(networkVersion));
  store.dispatch(updateLoginStatus(true));
  initSetProtocol(web3Instance.currentProvider);
  store.dispatch(initializeSetJS(web3Instance.currentProvider));
  toast(`🎉 ${i18n.t('components:web3.login-success')}`);
};

/**
 * initWithWeb3CurrentProvider
 * Initializes web3 and gets user's account using provider type.
 */
const initWithWeb3CurrentProvider = async (providerType: string): Promise<ILoginData> => {
  const { web3 } = window;
  const web3Instance = new Web3(web3.currentProvider);
  const loginData: ILoginData = {
    account: '',
    loggedIn: false,
    networkId: web3.currentProvider.networkVersion,
    providerType,
  };

  try {
    const accounts: string[] = await promisify(web3Instance.eth.getAccounts)();

    if (accounts && accounts.length > 0) {
      initWeb3Wallet(accounts, web3Instance, web3.currentProvider.networkVersion, providerType);
      loginData.account = accounts[0];
      loginData.loggedIn = true;
      return loginData;
    }
    return loginData;
  } catch (error) {
    // User denied account access
    return loginData;
  }
};

/**
 * initWithLedger
 * Initializes web3 using Ledger
 */
const initWithLedger = async (path = LEDGER_PATHS.DEFAULT_PATH): Promise<ILoginData> => {
  const loginData: ILoginData = {
    account: '',
    loggedIn: false,
    networkId: process.env.ETHEREUM_NETWORK_ID,
    providerType: WEB3_PROVIDERS.LEDGER,
  };

  try {
    const engine = ledgerEngine.getInstance(path, loginData.networkId);
    const web3Instance = new Web3(engine);

    const accounts = await web3Instance.eth.getAccounts();

    if (accounts && accounts.length > 0) {
      initWeb3Wallet(accounts, web3Instance, loginData.networkId, WEB3_PROVIDERS.LEDGER);
      store.dispatch(setLedgerPath(path));
      loginData.account = accounts[0];
      loginData.loggedIn = true;
    }
    return loginData;
  } catch (err) {
    // Some error occurred potentially on Ledger device side
    return loginData;
  }
};

/**
 * getEthereumAccounts
 * Grabs ethereum accounts depending on whether it uses ethereum.send or normal ethereum.enable
 */
const getEthereumAccounts = async (providerType: string): Promise<string[]> => {
  const { ethereum } = window;
  const web3Instance = new Web3(ethereum);
  let accounts: string[];

  if (providerType === WEB3_PROVIDERS.STATUS_WALLET) {
    accounts = await ethereum.send('eth_requestAccounts');
  } else {
    /**
     * Metamask login
     * Metamask pulls the document.title and uses that as the app's name in Metamask's initialization script.
     */
    const oldTitle = document.title;
    document.title = 'TokenSets';
    accounts = await ethereum.enable();
    document.title = oldTitle;
  }

  if (!accounts || accounts.length === 0) {
    accounts = await web3Instance.eth.getAccounts();
  }
  return accounts;
};

/**
 * initWithEthereum
 * Initializes web3 using the injected ethereum object. Used for Metamask, ImToken, and TrustWallet.
 */
const initWithEthereum = async (providerType: string): Promise<ILoginData> => {
  const { ethereum } = window;
  const web3Instance = new Web3(ethereum);
  const loginData: ILoginData = {
    account: '',
    loggedIn: false,
    networkId: ethereum.networkVersion,
    providerType,
  };

  try {
    const accounts = await getEthereumAccounts(providerType);

    if (accounts && accounts.length > 0) {
      initWeb3Wallet(accounts, web3Instance, ethereum.networkVersion, providerType);
      if (providerType !== WEB3_PROVIDERS.IMTOKEN) {
        // Subscribe to account and network changes.
        subscribeToProviderUpdates(ethereum);
      }
      loginData.account = accounts[0];
      loginData.loggedIn = true;
      return loginData;
    }
    return loginData;
  } catch (error) {
    // User denied account access
    return loginData;
  }
};

/**
 * initWalletLink
 * Initializes web3 and logs user in using Wallet Link.
 * Used for logging in with Coinbase Wallet.
 */
const initWalletLink = async (): Promise<ILoginData> => {
  const networkId = ETHEREUM_NETWORK_IDS.ETHEREUM_ENV_NETWORK;
  const loginData: ILoginData = {
    account: '',
    loggedIn: false,
    networkId,
    providerType: WEB3_PROVIDERS.INFURA,
  };

  try {
    const { provider, web3Instance } = setupWalletLink();

    const accounts = await provider.send('eth_requestAccounts');

    if (accounts && accounts.length > 0) {
      initWeb3Wallet(accounts, web3Instance, networkId, WEB3_PROVIDERS.INFURA);
      loginData.account = accounts[0];
      loginData.loggedIn = true;
      return loginData;
    }
    console.log('Error retrieving accounts');
    return loginData;
  } catch (error) {
    // User denied account access
    return loginData;
  }
};

/**
 * initWalletConnect
 * Initializes web3 and logs user in using WalletConnect.
 * Used for logging in with WalletConnect wallets.
 */
const initWalletConnect = async (): Promise<ILoginData> => {
  const networkId = ETHEREUM_NETWORK_IDS.ETHEREUM_ENV_NETWORK;
  const loginData: ILoginData = {
    account: '',
    loggedIn: false,
    networkId,
    providerType: WEB3_PROVIDERS.INFURA,
  };

  try {
    const { provider, web3Instance } = await setupWalletConnectAsync(networkId);

    const accounts = provider.accounts;

    if (accounts && accounts.length > 0) {
      initWeb3Wallet(accounts, web3Instance, networkId, WEB3_PROVIDERS.WALLET_CONNECT);
      loginData.account = accounts[0];
      loginData.loggedIn = true;

      provider.on('disconnect', () => {
        store.dispatch(logOut());
      });

      return loginData;
    }

    return loginData;
  } catch (error) {
    // User denied account access
    return loginData;
  }
};

/**
 * getWeb3
 * Initializes web3 based on provider
 */
export const getWeb3 = async (providerType?: string) => {
  const { ethereum, web3 } = window;
  const {
    web3: { ledgerPath },
  } = store.getState();
  // Modern dapp browsers with opt out of Fortmatic
  switch (providerType) {
    case WEB3_PROVIDERS.METAMASK:
      if (ethereum) {
        return await initWithEthereum(providerType);
      }
      break;
    case WEB3_PROVIDERS.LEDGER:
      return await initWithLedger(ledgerPath);
    case WEB3_PROVIDERS.IMTOKEN:
      if (ethereum) {
        return await initWithEthereum(providerType);
      } else if (web3) {
        return await initWithWeb3CurrentProvider(providerType);
      }
      break;
    case WEB3_PROVIDERS.OPERA:
      if (ethereum) {
        return await initWithEthereum(providerType);
      }
      break;
    case WEB3_PROVIDERS.TRUST_WALLET:
      if (web3) {
        return await initWithWeb3CurrentProvider(providerType);
      }
      break;
    case WEB3_PROVIDERS.COINBASE_WALLET:
      if (web3) {
        return await initWithWeb3CurrentProvider(providerType);
      }
      break;
    case WEB3_PROVIDERS.INFURA:
      return await initWalletLink();
    case WEB3_PROVIDERS.WALLET_CONNECT:
      return await initWalletConnect();
    case WEB3_PROVIDERS.STATUS_WALLET:
      if (ethereum) {
        return await initWithEthereum(providerType);
      }
      break;
    case WEB3_PROVIDERS.ALPHA_WALLET:
      if (ethereum) {
        return await initWithEthereum(providerType);
      }
      break;
    case WEB3_PROVIDERS.MOBILE_WEB3_WALLET:
      if (web3) {
        return await initWithWeb3CurrentProvider(providerType);
      } else if (ethereum) {
        return await initWithEthereum(providerType);
      }
      break;
    default:
      break;
  }
};

/**
 * Detects if user is using Opera and if ethereum is being injected into the browser.
 */
export const detectOperaWallet = (): boolean => {
  const isUsingOpera =
    (!!window.opr && !!window.opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(' OPR/') >= 0 || // Opera version 15 and beyond
    navigator.userAgent.indexOf(' Opera/') >= 0 || // Opera versions below version 15
    navigator.userAgent.indexOf(' Opera Mobi/') >= 0 || // Opera mobile
    navigator.userAgent.indexOf(' OPT/') >= 0; // Opera Touch for mobile
  const hasOperaWallet = isUsingOpera && !!window.ethereum;
  return hasOperaWallet;
};

export const detectWalletType = () => {
  const {
    windowDimension: { isMobile },
  } = store.getState();

  const metaMaskEnabled = window.ethereum && !!(window.ethereum as any).isMetaMask;
  const imTokenEnabled =
    !!window.imToken || (window.ethereum && !!(window.ethereum as any).isImToken);
  const coinbaseWalletEnabled =
    window.web3 &&
    window.web3.currentProvider &&
    (!!window.web3.currentProvider.isToshi || !!window.web3.currentProvider.isCipher);
  const trustWalletEnabled =
    window.web3 && window.web3.currentProvider && !!window.web3.currentProvider.isTrust;
  const statusWalletEnabled = window.ethereum && !!(window.ethereum as any).isStatus;
  const alphaWalletEnabled =
    window.web3 && window.web3.currentProvider && !!window.web3.currentProvider.isAlphaWallet;
  // Opera 8.0+ + window.ethereum check
  const operaWalletEnabled = detectOperaWallet();
  const isMobileWallet = isMobile && (window.web3 || window.ethereum);

  return {
    metaMaskEnabled,
    imTokenEnabled,
    coinbaseWalletEnabled,
    trustWalletEnabled,
    statusWalletEnabled,
    alphaWalletEnabled,
    operaWalletEnabled,
    isMobileWallet,
  };
};

/**
 * Logs user into Web3
 */
export const login = async (): Promise<ILoginData> => {
  const enabledWallets = detectWalletType();

  if (enabledWallets.imTokenEnabled) {
    return await getWeb3(WEB3_PROVIDERS.IMTOKEN);
  } else if (enabledWallets.coinbaseWalletEnabled) {
    return await getWeb3(WEB3_PROVIDERS.COINBASE_WALLET);
  } else if (enabledWallets.trustWalletEnabled) {
    return await getWeb3(WEB3_PROVIDERS.TRUST_WALLET);
  } else if (enabledWallets.metaMaskEnabled) {
    return await getWeb3(WEB3_PROVIDERS.METAMASK);
  } else if (enabledWallets.operaWalletEnabled) {
    return await getWeb3(WEB3_PROVIDERS.OPERA);
  } else if (enabledWallets.statusWalletEnabled) {
    return await getWeb3(WEB3_PROVIDERS.STATUS_WALLET);
  } else if (enabledWallets.alphaWalletEnabled) {
    return await getWeb3(WEB3_PROVIDERS.ALPHA_WALLET);
  } else if (enabledWallets.isMobileWallet) {
    return await getWeb3(WEB3_PROVIDERS.MOBILE_WEB3_WALLET);
  }
};

/**
 * getNetworkId
 * Gets the network id that the user is on.
 */
export const getNetworkId = async (web3Instance: Web3) => {
  if (!web3Instance || !web3Instance.eth) return -1;

  return promisify(web3Instance.eth.net.getId)();
};

/**
 * getAccount
 * Gets the user's account string
 */
export const getAccount = async (web3Instance: Web3) => {
  if (!web3Instance) {
    return '';
  }
  const accounts = await promisify(web3Instance.eth.getAccounts)();
  if (!accounts || accounts.length === 0) {
    return '';
  }
  return accounts[0];
};

/**
 * Generates a signature for the passed in message.
 * Throws if signing is unsuccessful.
 * @param web3Instance - Web 3 Instance. Usually provided via redux store.
 * @param message - The message to be signed.
 * @param account - The account address used to generate the signature.
 */
export const getMessageSignature = async (web3Instance: any, message: string, account: string) => {
  if (!account || account.length === 0) {
    toast(i18n.t('components:web3.create-signature-failed'));
    throw new Error('No Account. Unable to generate message signature.');
  }
  const web3Message = web3Instance.utils.fromUtf8(message);

  // Have to cast web3Instance to 'any' because the @types/web3 improperly sets no params to `sign` method
  return await web3Instance.eth.personal.sign(web3Message, account);
};

/**
 * initWeb3
 * Initializes an instance of web3 based on the type of provider the user has chosen.
 */
export const initWeb3 = () => {
  const {
    web3: { providerType },
  } = store.getState();
  const { ethereum } = window;

  if (
    (providerType === WEB3_PROVIDERS.METAMASK || providerType === WEB3_PROVIDERS.IMTOKEN) &&
    ethereum
  ) {
    store.dispatch(setCurrentNetworkId(ethereum.networkVersion));
    subscribeToProviderUpdates(ethereum);
  }

  return getWeb3Instance();
};

/**
 * getWeb3Instance
 * Returns an instance of web3 based on what the providerType is
 */
export const getWeb3Instance = () => {
  const {
    web3: { providerType, ledgerPath, networkId },
  } = store.getState();
  const { ethereum, web3 } = window;

  let web3Instance = undefined;
  if (
    (providerType === WEB3_PROVIDERS.METAMASK || providerType === WEB3_PROVIDERS.IMTOKEN) &&
    ethereum
  ) {
    web3Instance = new Web3(ethereum);
    store.dispatch(setCurrentNetworkId(ethereum.networkVersion));
    subscribeToProviderUpdates(ethereum);
  } else if (
    (providerType === WEB3_PROVIDERS.COINBASE_WALLET ||
      providerType === WEB3_PROVIDERS.TRUST_WALLET) &&
    web3
  ) {
    web3Instance = new Web3(web3.currentProvider);
  } else if (providerType === WEB3_PROVIDERS.OPERA) {
    web3Instance = new Web3(ethereum);
    store.dispatch(setCurrentNetworkId('1'));
  } else if (providerType === WEB3_PROVIDERS.INFURA) {
    web3Instance = setupWalletLink().web3Instance;
  } else if (providerType === WEB3_PROVIDERS.WALLET_CONNECT) {
    web3Instance = setupWalletConnectSync(networkId).web3Instance;
  } else if (providerType === WEB3_PROVIDERS.LEDGER) {
    const engine = ledgerEngine.getInstance(ledgerPath, networkId);
    web3Instance = new Web3(engine);
  }
  return web3Instance;
};

/**
 * getLedgerWeb3
 * Returns an instance of a Ledger-enabled Web3 instance
 */
export const getLedgerWeb3 = (ledgerPath: string) => {
  const networkId = process.env.ETHEREUM_NETWORK_ID;

  const engine = ledgerEngine.getInstance(ledgerPath, networkId);
  return new Web3(engine);
};

/**
 * isValidSetProtocol
 * Ensures that web3 and setProtocol are initialized, and that the user is on the right network.
 */
export const isValidSetProtocol = (web3: any, setProtocol: any, networkId: string) => {
  if (!web3) return false;
  if (!setProtocol) return false;
  if (String(networkId) !== process.env.ETHEREUM_NETWORK_ID) return false;

  return true;
};

/**
 * Returns true if the error indicates the user rejected a metamask transaction request
 * @param error - Error object, ideally from setprotocol.js/metamask
 */
export const userRejectedMetamaskTransaction = (error: any): boolean => {
  if (
    typeof error === 'object' &&
    (error.message.includes('User denied transaction') ||
      error.code === -32603 ||
      error.message.includes('Internal JSON-RPC error'))
  ) {
    return true;
  }
  return false;
};

/**
 * Returns true if error indicates user is on the wrong network
 * @param error - Error object from setprotocol.js/metamask
 */
export const userIsOnWrongNetwork = (error: any) => {
  if (
    typeof error === 'object' &&
    error.message.includes('Unable to find address for contract') &&
    error.message.includes('on network with id')
  ) {
    return true;
  }
  return false;
};

/**
 * Returns true if the error indicates the transaction is still awaiting confirmation past timeout.
 * Returns false otherwise.
 * @param error - Error object
 */
export const transactionStillAwaitingConfirmation = (error: any): boolean => {
  if (typeof error === 'object' && error.message.includes('Timeout has been exceeded')) {
    return true;
  }
  return false;
};

/**
 * Returns true if the transaction mines, returns false if the transaction times out.
 * Throws for any other error
 * @param txId - The transaction id awaiting confirmation
 * @param setProtocolInstance - An instance of setprotocol.js
 */
export const confirmTransactionMined = async (
  txId: string,
  setProtocolInstance: SetProtocol,
  waitTime = 20000,
): Promise<boolean> => {
  try {
    const receipt = await setProtocolInstance.awaitTransactionMinedAsync(txId, undefined, waitTime);

    if (!receipt.status) throw new Error('Transaction was mined but failed or reverted.');

    return true;
  } catch (e) {
    if (transactionStillAwaitingConfirmation(e)) {
      return false;
    }

    // If an unexpected error occurs, pass it on
    throw e;
  }
};

export const makeEtherscanLink = (transactionHash: string) => {
  return `https://${SUBDOMAIN}.etherscan.io/tx/${transactionHash}`;
};
