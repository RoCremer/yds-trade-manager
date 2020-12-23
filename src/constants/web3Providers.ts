const ALPHA_WALLET = 'ALPHA_WALLET';
const COINBASE_WALLET = 'COINBASE_WALLET';
const WALLET_CONNECT = 'WALLET_CONNECT';
const IMTOKEN = 'IMTOKEN';
const METAMASK = 'METAMASK';
const OPERA = 'OPERA';
const TRUST_WALLET = 'TRUST_WALLET';
const INFURA = 'INFURA';
const LEDGER = 'LEDGER';
const STATUS_WALLET = 'STATUS_WALLET';
const WALLET_LINK = 'WALLET_LINK';
const MOBILE_WEB3_WALLET = 'MOBILE_WEB3_WALLET';

export const WEB3_PROVIDERS = {
  ALPHA_WALLET,
  COINBASE_WALLET,
  IMTOKEN,
  METAMASK,
  OPERA,
  TRUST_WALLET,
  INFURA,
  LEDGER,
  STATUS_WALLET,
  WALLET_LINK,
  MOBILE_WEB3_WALLET,
  WALLET_CONNECT,
};

export const WEB3_PROVIDER_LOGGING_LABEL: { [key: string]: string } = {
  METAMASK: 'metamask',
  COINBASE_WALLET: 'coinbase',
  INFURA: 'wallet_link',
  LEDGER: 'ledger',
  TRUST_WALLET: 'trust_wallet',
  IMTOKEN: 'im_token',
  ALPHA_WALLET: 'alpha_wallet',
  STATUS_WALLET: 'status_wallet',
  OPERA: 'opera',
  MOBILE_WEB3_WALLET: 'mobile_web3_wallet',
  WALLET_CONNECT: 'wallet_connect',
};

export const LEDGER_PATHS = {
  DEFAULT_PATH: "44'/60'/0'",
  LEGACY_PATH: "44'/60'/0'/0",
};
