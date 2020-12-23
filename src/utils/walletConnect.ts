import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { infuraKey } from '@utils/infura';

/**
 * Attempt to setup wallet connect. Called on the login modal.
 * If wallet connect is not initialized must be awaited to show QR code + allow login.
 * @param chainId - Network Id to connect to.
 */
export const setupWalletConnectAsync = async (chainId: string | number) => {
  const provider = new WalletConnectProvider({
    infuraId: infuraKey,
    chainId: Number(chainId),
  });

  await provider.enable();

  const web3Instance = new Web3(provider);

  return {
    provider,
    web3Instance,
  };
};

/**
 * Attempt to setup wallet connect. If wallet connect has already been initialized
 * provider.enable will run synchronously/not need to be awaited.
 * @param chainId - Network Id to connect to
 */
export const setupWalletConnectSync = (chainId: string | number) => {
  const provider = new WalletConnectProvider({
    infuraId: infuraKey,
    chainId: Number(chainId),
  });

  provider.enable();

  const web3Instance = new Web3(provider);

  return {
    provider,
    web3Instance,
  };
};
