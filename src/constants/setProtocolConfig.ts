import { ISetProtocolConfig } from '@typings/index';

const SET_PROTOCOL_CONFIG: ISetProtocolConfig = {
  coreAddress: process.env.CORE_ADDRESS,
  cTokenWhiteListAddress: process.env.C_TOKEN_WHITE_LIST_ADDRESS,
  exchangeIssuanceModuleAddress: process.env.EXCHANGE_ISSUE_MODULE_ADDRESS,
  issuanceOrderModuleAddress: process.env.ISSUANCE_ORDER_MODULE_ADDRESS,
  kyberNetworkWrapperAddress: process.env.KYBER_NETWORK_WRAPPER_ADDRESS,
  linearAuctionPriceCurve: process.env.LINEAR_AUCTION_PRICE_CURVE_ADDRESS,
  rebalanceAuctionModuleAddress: process.env.REBALANCE_AUCTION_MODULE_ADDRESS,
  rebalancingSetExchangeIssuanceModule: process.env.PAYABLE_EXCHANGE_ISSUE_ADDRESS,
  rebalancingSetIssuanceModule: process.env.REBALANCING_SET_ISSUANCE_MODULE_ADDRESS,
  rebalancingSetTokenFactoryAddress: process.env.REBALANCING_SET_TOKEN_FACTORY_ADDRESS,
  rebalancingSetCTokenBidderAddress: process.env.REBALANCING_SET_CTOKEN_BIDDER_ADDRESS,
  setTokenFactoryAddress: process.env.SET_TOKEN_FACTORY_ADDRESS,
  transferProxyAddress: process.env.TRANSFER_PROXY_ADDRESS,
  vaultAddress: process.env.VAULT_ADDRESS,
  wrappedEtherAddress: process.env.WETH_ADDRESS,
  protocolViewerAddress: process.env.PROTOCOL_VIEWER_ADDRESS,
};

export default SET_PROTOCOL_CONFIG;
