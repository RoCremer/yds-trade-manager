import ETHEREUM_NETWORK_IDS from './ethereumNetworkIds';
const { MAIN_NET_ID, ROPSTEN_ID, KOVAN_ID } = ETHEREUM_NETWORK_IDS;

const subdomain = {
  [MAIN_NET_ID]: 'www',
  [ROPSTEN_ID]: 'ropsten',
  [KOVAN_ID]: 'kovan',
};

const SUBDOMAIN = subdomain[process.env.ETHEREUM_NETWORK_ID];

export default SUBDOMAIN;
