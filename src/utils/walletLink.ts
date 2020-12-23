import Web3 from 'web3';
import WalletLink from 'walletlink';
import { ETHEREUM_NETWORK_IDS } from '@constants/index';
import { infuraDomain, infuraKey } from '@utils/infura';

const setupWalletLink = () => {
  const walletLink = new WalletLink({
    appName: 'TokenSets',
    appLogoUrl: 'https://set-core.s3.amazonaws.com/img/logos/set-logo-padded.png',
  });

  const provider = walletLink.makeWeb3Provider(
    `${infuraDomain}${infuraKey}`,
    Number(ETHEREUM_NETWORK_IDS.ETHEREUM_ENV_NETWORK),
  );

  const web3Instance = new Web3(provider);

  return {
    walletLink,
    provider,
    web3Instance,
  };
};

export default setupWalletLink;
