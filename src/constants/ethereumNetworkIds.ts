const MAIN_NET_ID = '1';
const ROPSTEN_ID = '3';
const KOVAN_ID = '42';
/**
 * The network used across the app. Either uses the network supplied from the process.env on Heroku
 * or the TestNet ID we specify for development.
 */
const ETHEREUM_ENV_NETWORK = process.env.ETHEREUM_NETWORK_ID || KOVAN_ID;

export default {
  MAIN_NET_ID,
  ROPSTEN_ID,
  KOVAN_ID,
  ETHEREUM_ENV_NETWORK,
};
