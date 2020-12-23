import tinycolor from 'tinycolor2';
import { ComponentType } from 'react';

import { BigNumber } from '@utils/index';

export interface IAction {
  readonly payload: any;
  readonly type: string;
  readonly [key: string]: any;
}

export interface IAddon {
  readonly color?: string;
  readonly label?: string;
  readonly text?: any;
  readonly type: string;
  readonly element?: any;
  readonly customStyles?: any;
  readonly onClick?: (...args: any[]) => any;
}

export type Addons = IAddon[];

export interface IAllocationPrices {
  [tokenId: string]: IPrice[];
}

export interface IAnnouncement {
  image_url: string;
  action_url: string;
  label: string;
}

export interface IAmounts {
  [symbol: string]: BigNumber;
}

interface IApprove {
  readonly isPending: boolean;
  readonly txHash: string;
}

export interface IApproves {
  [id: string]: IApprove;
}

export interface IApprovalData {
  readonly address: string;
  readonly id: string;
}

export interface IFundBalance {
  address: string;
  amount: string;
  balance_usd: string;
  components: ISetComponentBalance[];
  daily_percent_change: string;
  id: string;
  image: string;
  name: string;
  symbol: string;
  onchainBalance?: BigNumber; // Annotated by an onchain fetch
}

export interface IRebalancingSetBalance {
  address: string;
  amount: string;
  balance_usd: string;
  components: ISetComponentBalance[];
  daily_percent_change: string;
  id: string;
  image: string;
  legacy: boolean;
  name: string;
  sentiment: number;
  symbol: string;
  onchainBalance?: BigNumber; // Annotated by an onchain fetch
}

interface ISetComponentBalance {
  name: string;
  balance: string;
  amount: string;
  image: string;
}

export interface ICoinBalance {
  address: string;
  amount: string;
  balance_usd: string;
  decimals: number;
  id: string;
  image: string;
  name: string;
  price_usd: string;
  symbol: string;
  onchainBalance?: BigNumber; // Annotated by an onchain fetch
}

export type IERC20Balance = IFundBalance | IRebalancingSetBalance | ICoinBalance;

export interface IBalances {
  fund_balances: IFundBalance[];
  rebalancing_set_balances: IRebalancingSetBalance[];
  coin_balances: ICoinBalance[];
  total_balance_usd: string;
  eth_balance: string;
  eth_balance_usd: string;
}

export interface IBalancesMapping {
  [id: string]: IERC20Balance;
}

export interface ICoinBalancesMapping {
  [id: string]: ICoinBalance;
}

interface IButtonDecoration {
  [key: string]: any;
}

export interface IButtonStyles {
  containerStyleDecoration: IButtonDecoration;
  textStyleDecoration: IButtonDecoration;
  iconStyleDecoration: IButtonDecoration;
  [key: string]: any;
}

export type Children = JSX.Element | JSX.Element[];

export interface IClassObject {
  [key: string]: string;
}

export type Color = string | object | tinycolor.Instance;

export interface IColor {
  starting: string;
  ending: string;
  display_order: number;
}

export interface IColorMapping {
  [key: string]: string;
}

export interface IColors {
  // SOLID COLORS
  readonly blue: string;
  readonly mediumBlue: string;
  readonly darkBlue: string;
  readonly darkGray: string;
  readonly gray: string;
  readonly lightGray: string;
  readonly green: string;
  readonly red: string;
  readonly pink: string;
  readonly yellow: string;
  readonly white: string;
  readonly black: string;
  // DARKED COLORS
  readonly blueDarkened: string;
  readonly mediumBlueDarkened: string;
  readonly darkBlueDarkened: string;
  readonly darkGrayDarkened: string;
  readonly grayDarkened: string;
  readonly lightGrayDarkened: string;
  readonly greenDarkened: string;
  readonly redDarkened: string;
  readonly pinkDarkened: string;
  readonly yellowDarkened: string;
  readonly whiteDarkened: string;
  // TRANSPARENT
  readonly blueAlpha25: string;
  readonly greenAlpha25: string;
  readonly redAlpha25: string;
  readonly whiteAlpha50: string;
  readonly blackAlpha50: string;
  // INDEX SIGNATURE
  [key: string]: string;
}

export interface IComponentToken {
  readonly id?: string;
  readonly type: string;
  readonly address: string;
  readonly current_price_usd: string;
  readonly decimals: number;
  readonly name: string;
  readonly units: string;
  readonly image?: string;
  readonly symbol?: string;
  readonly exchange_rate?: string;
  readonly gas?: string;
}

export interface IComponentTokenColors {
  [key: string]: string;
}

export interface ICreateSetIcon {
  file: File;
  previewSrc: string;
  quickSelectIcon: IQuickSelectIcon;
}

export interface IBuySellOrderSetComponent {
  name: string;
  symbol: string;
  image: string;
  address: string;
  quantity: string;
  price_usd: string;
}

export type IERC20Token = FundDetails | IToken | ITradingPair;

export interface IExchangeComponent {
  address: string;
  quantity: string;
  exchange_id?: string;
}

export interface IFaqSection {
  sectionTitle: string;
  sectionContent: IFaqSectionContent[];
}

export interface IFaqSectionContent {
  question: (...args: any[]) => any;
  answer: (...args: any[]) => any;
  index?: number;
}

export interface IFeeUpdateStatus {
  locktime: string;
  transaction_hash: string;
  new_fee: string;
}

export type OrderData = {
  readonly calldata: string;
  readonly from: string;
  readonly from_token_address: string;
  readonly from_token_amount: string;
  readonly gas: string;
  readonly gas_price: string;
  readonly slippage_percentage: string;
  readonly to: string;
  readonly to_token_address: string;
  readonly to_token_amount: string;
  readonly display: OrderDataDisplay;
};

export type OrderDataDisplay = {
  readonly fee_percentage: string;
  readonly from_token: IToken;
  readonly from_token_display_amount: string;
  readonly from_token_price_usd: string;
  readonly gas_costs_usd: string;
  readonly gas_costs_eth: string;
  readonly slippage: string;
  readonly to_token: IToken;
  readonly to_token_display_amount: string;
  readonly to_token_price_usd: string;
  readonly value: string;
};

export type FundDetails = {
  readonly address: string;
  readonly claim_fee: string;
  readonly benchmark_asset: BenchmarkAsset;
  readonly buy_disabled: boolean;
  readonly sell_disabled: boolean;
  readonly components: IToken[];
  readonly created_at: string;
  readonly current_watermark: string;
  readonly description: string;
  readonly estimated_apy: string;
  readonly issue_fee: string;
  readonly is_nav_issuance_enabled: boolean;
  readonly is_uniswap_buy_enabled: boolean;
  readonly experimental: boolean;
  readonly follower_count: number;
  readonly holder_count: number;
  readonly id: string;
  readonly image: string;
  readonly legacy: boolean;
  readonly market_cap: string;
  readonly max_drawdown: string;
  readonly name: string;
  readonly nav_premium_fee: string;
  readonly operator: ITrader;
  readonly operator_contribution: string;
  readonly performance_fee: string;
  readonly posts: IFeedPost[];
  readonly price_usd: string;
  readonly rebalances_per_month: number;
  readonly rebalances_this_month: number;
  readonly redeem_fee: string;
  readonly streaming_fee: string;
  readonly symbol: string;
  readonly total_rebalances: number;
  readonly total_unactualized_fees: IUnactualizedFee;
  readonly unactualized_streaming_fees: IUnactualizedFee;
  readonly unactualized_performance_fees: IUnactualizedFee;
};

export interface IFundConfirmedWarningsList {
  [fundId: string]: boolean;
}

export enum FeedTypes {
  HOME = 'HOME',
  SET_LANDING = 'SET_LANDING',
  TRADER_PROFILE = 'TRADER_PROFILE',
}

export interface IGradients {
  [key: string]: string[];
}

export interface IHistoricals {
  readonly components: {
    readonly prices: { [tokenId: string]: string };
    readonly quantities: { [tokenId: string]: string };
    readonly target_allocations: { [tokenId: string]: string };
  };
  readonly dates: string[];
  readonly prices: string[];
  readonly rebalances: string[];
}

export interface IHistory {
  push: (...args: any[]) => any;
  goBack?: (...args: any[]) => any;
}

export interface IIcon {
  image_url: string;
  display_order: number;
}

export interface IIconInfo {
  header: string;
  description: string;
  url?: string;
}

export interface ILink {
  readonly to: string;
  readonly text: string;
}

export interface ILoginData {
  account: string;
  loggedIn: boolean;
  readonly networkId: string;
  readonly providerType: string;
}

export interface IMatch {
  isExact?: boolean;
  params: {
    set?: string;
    username?: string;
  };
  path: string;
  url: string;
}

export interface IMenuItem {
  readonly name: string;
  readonly path?: string;
  readonly svg?: string;
  readonly svgInactive?: string;
}

export interface INavBarMapping {
  Explore: string;
  Creator: string;
  Account: string;
  [linkName: string]: string;
}

export interface IOrderDisplay {
  gas_cost: string;
  gas_price_usd: string;
  price_currency: string;
  price_per_set_usd: string;
  total_price_usd: string;
  quantity: string;
  received_currency_from_exchange?: string;
  required_currency_for_exchange?: string;
  components: IBuySellOrderSetComponent[];
  entry_fee?: IEntryFee;
}

export interface IEntryFee {
  description: string;
  price_set: string;
  price_usd: string;
}

export interface IPrice {
  readonly date: string;
  readonly price?: string;
  readonly rebalance?: string;
  readonly oracle_historical?: string;
  readonly [tokenId: string]: string;
}

export interface IQuickSelectIcon {
  image_url: string;
  display_order: number;
}

export interface IResults {
  [key: string]: any;
}

export interface IRebalancingCriteria {
  readonly description?: string;
  readonly price?: {
    requirement?: string;
    title?: string;
    valid?: boolean;
    value?: string;
  };
  readonly rebalance?: {
    title?: string;
    valid?: boolean;
    value?: string;
  };
  readonly time?: {
    requirement?: string;
    title?: string;
    valid?: boolean;
    value?: string;
    proposal_period_started_at?: string;
    proposal_period_end_at?: string;
    initial_confirmation_at?: string;
    confirmation_window_start_at?: string;
    confirmation_window_end_at?: string;
  };
}

export interface IHistoricalPrices {
  readonly dates: string[];
  readonly prices: string[];
}

export enum BenchmarkAsset {
  WETH = 'WETH',
  USDC = 'USDC',
  WBTC = 'WBTC',
}

export enum HomeFeedTabs {
  FOLLOWING = 'FOLLOWING',
  DISCOVER = 'DISCOVER',
}

export interface IIssuanceSource {
  readonly id: string;
  readonly name: string;
  readonly exchange_url: string;
  readonly exchange_image_url: string;
}

type FundIssuanceDisplayData = {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly image: string;
  readonly quantity: string;
  readonly gas_price_usd: string;
  readonly gas_cost: string;
  readonly components: IToken[];
};

export type FundIssuanceData = {
  readonly issue_quantity: string;
  readonly address: string;
  readonly gas_cost: string;
  readonly gas_price: string;
  readonly display: FundIssuanceDisplayData;
};

type FundRedemptionDisplayData = {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly image: string;
  readonly quantity: string;
  readonly gas_price_usd: string;
  readonly gas_cost: string;
  readonly components: IToken[];
};

export type FundRedemptionData = {
  readonly redeem_quantity: string;
  readonly address: string;
  readonly gas_cost: string;
  readonly gas_price: string;
  readonly display: FundRedemptionDisplayData;
};

export interface IRebalancingSet {
  readonly address?: string;
  readonly beta?: boolean;
  readonly benchmark: boolean;
  readonly benchmark_asset?: BenchmarkAsset;
  readonly buy_disabled?: boolean;
  readonly sell_disabled?: boolean;
  readonly colors: string[];
  readonly components?: IToken[];
  readonly created_at?: string;
  readonly current_watermark?: string;
  readonly daily_percent_change?: string;
  readonly monthly_percent_change?: string;
  readonly daily_price_change?: string;
  readonly description?: string;
  readonly short_description?: string;
  readonly historicals?: IHistoricals;
  readonly coin_historicals?: IAllocationPrices;
  readonly oracle_historicals?: IHistoricalPrices;
  readonly id: string;
  readonly issuance_sources: IIssuanceSource[];
  readonly is_ratio?: boolean;
  readonly image: string;
  readonly legacy?: boolean;
  readonly market_coverage?: string;
  readonly name: string;
  readonly next_rebalance?: string;
  readonly price_usd: string;
  readonly rebalancing_interval?: string;
  readonly rebalance_criteria?: IRebalancingCriteria;
  readonly strategy_medium_description?: string;
  readonly strategy_short_description?: string;
  readonly status: string;
  readonly strategy: string;
  readonly strategy_description: string;
  readonly strategy_title: string;
  readonly sentiment?: 0 | 1 | 2 | 3 | 4 | 5;
  readonly subtitle?: string;
  readonly subtitle_description?: string;
  readonly symbol: string;
  readonly tolerance?: string;
  readonly unit_shares?: string;
  readonly interest_rate?: string;
  readonly entry_fee_percentage?: string;
  readonly performance_fee?: string;
  readonly streaming_fee?: string;
  readonly market_cap?: string;
  readonly is_trading_pool?: boolean;
  readonly total_rebalances?: number;
  readonly rebalances_per_month?: number;
  readonly rebalances_this_month?: number;
  readonly max_drawdown?: string;
  readonly operator_contribution?: string;
  readonly follower_count?: number;
  readonly holder_count?: number;
  readonly operator?: ITrader;
  readonly unactualized_streaming_fees?: IUnactualizedFee;
  readonly unactualized_performance_fees?: IUnactualizedFee;
  readonly total_unactualized_fees?: IUnactualizedFee;
  readonly posts?: IFeedPost[];
  readonly old_rebalancing_set?: IRebalancingSetSmall;
  readonly new_rebalancing_set?: IRebalancingSetVersion;
  readonly is_new_release?: boolean;
  readonly is_sponsored?: boolean;
  readonly sponsor_text?: string;
}

export interface ITraderFund {
  id: string;
  name: string;
  image_url: string;
  price_usd: string;
  daily_percent_change: string;
  market_cap: string;
  holder_count: string;
  created_at: string;
  total_rebalances: number;
  max_drawdown: string;
  streaming_fee: string;
  components: IToken[];
}

export interface IRebalancingSetSmall {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly image: string;
  readonly components: IToken[];
}

export interface IRebalancingSetVersion {
  readonly id: string;
  readonly name: string;
}

export interface IPhoneNumber {
  id: string;
  masked_number: string;
  allows_sms: boolean;
  allows_call: boolean;
}

export interface ISetFeeUpdates {
  id: string;
  price_eth: string;
  price_btc: string;
  entry_fee_update_transaction?: IFeeUpdateStatus;
  performance_fee_update_transaction?: IFeeUpdateStatus;
  streaming_fee_update_transaction?: IFeeUpdateStatus;
}

export interface IExploreDetails {
  readonly max_drawdown?: string;
  readonly cumulative_change?: string;
  readonly daily_percent_change?: string;
  readonly market_cap: string;
  readonly month_percent_change?: string;
  readonly set_price: string;
  readonly three_month_percent_change?: string;
  readonly week_percent_change?: string;
  readonly year_percent_change?: string;
}

export interface IExploreRebalancingSet {
  readonly eth_index: IExploreDetails;
  readonly btc_index: IExploreDetails;
  readonly id: string;
  readonly image: string;
  readonly name: string;
  readonly strategy: string;
  readonly symbol: string;
  readonly usd_index: IExploreDetails;
  readonly is_new_release?: boolean;
  readonly short_description?: string;
  readonly operator?: ITrader;
  readonly follower_count?: string;
  readonly holder_count?: string;
  readonly entry_fee_percentage?: string;
  readonly max_drawdown?: string;
  readonly is_trading_pool?: boolean;
  readonly is_ratio?: boolean;
  readonly is_interest_bearing?: boolean;
  readonly sentiment?: 0 | 1 | 2 | 3 | 4 | 5;
  readonly components?: IToken[];
}

export interface IFeedPost {
  readonly id: number;
  readonly username: string;
  readonly image_url: string;
  readonly text: string;
  readonly date: string;
  readonly timestamp: string;
  readonly set_name?: string;
  readonly set_id?: string;
  readonly fund_id?: string;
  readonly set_image_url: string;
  readonly previous_allocation?: [IToken, IToken];
  readonly next_allocation?: [IToken, IToken];
  readonly can_be_deleted?: boolean;
}

export interface ISet {
  readonly address: string;
  readonly colors: string[];
  readonly components: IToken[];
  readonly created_at?: string;
  readonly description?: string;
  readonly short_description?: string;
  readonly historicals?: IHistoricals;
  readonly id: string;
  readonly image: string;
  readonly market_cap: string;
  readonly name: string;
  readonly natural_units: number;
  readonly price_eth: string;
  readonly price_usd: string;
  readonly percent_change_daily: string;
  readonly supply: string;
  readonly symbol: string;
}

export interface ITokenBalances {
  [tokenAddress: string]: BigNumber;
}

export type TokenApprovalStatus = {
  isPending: boolean;
  isApproved: boolean;
  isUniswapPending: boolean;
  isUniswapApproved: boolean;
  isNavIssuancePending: boolean;
  isNavIssuanceApproved: boolean;
};

export interface ISetProtocolConfig {
  readonly coreAddress: string;
  readonly cTokenWhiteListAddress: string;
  readonly transferProxyAddress: string;
  readonly vaultAddress: string;
  readonly setTokenFactoryAddress: string;
  readonly rebalancingSetTokenFactoryAddress: string;
  readonly rebalancingSetCTokenBidderAddress: string;
  readonly rebalanceAuctionModuleAddress: string;
  readonly kyberNetworkWrapperAddress: string;
  readonly issuanceOrderModuleAddress: string;
  readonly exchangeIssuanceModuleAddress: string;
  readonly rebalancingSetExchangeIssuanceModule: string;
  readonly rebalancingSetIssuanceModule: string;
  readonly wrappedEtherAddress: string;
  readonly protocolViewerAddress: string;
  readonly [key: string]: string;
}

export interface ISocialMediaIcon {
  readonly name: string;
  readonly path: string;
  readonly icon: string;
  readonly iconLarge: string | undefined;
  readonly alt: string;
}

export interface IStrategy {
  beta: boolean;
  description: string;
  short_description: string;
  medium_description: string;
  id: string;
  name: string;
  image: string;
  sets: IRebalancingSet[];
}

export interface IStrategies {
  readonly [key: string]: string;
}

export interface ITextElements {
  [key: string]: (props: any) => JSX.Element;
}

export type TransactionOptions = {
  from: string;
  gas: string;
  gasPrice: string;
  value?: string | number | BigNumber;
};

export interface IToken {
  readonly address?: string;
  readonly amount?: string;
  readonly balance?: string;
  readonly benchmark?: boolean;
  readonly colors?: string[];
  readonly daily_percent_change?: string;
  readonly decimals?: string;
  readonly id: string;
  readonly image?: string;
  readonly image_url: string;
  readonly info?: ITokenInfo;
  readonly name?: string;
  readonly percent_of_set?: string;
  readonly price_usd?: string;
  readonly price_eth?: string;
  readonly quantity?: string;
  readonly symbol: string;
  readonly total_price_usd?: string;
  readonly full_amount_in_set?: string;
  readonly target_allocation?: string;
  readonly units?: string;
  readonly coin_type?: string;
  readonly stable?: boolean;
  readonly base_asset?: boolean;
}

export interface ITokenInfo {
  readonly address: string;
  readonly amount?: string;
  readonly daily_percent_change: string;
  readonly decimals: string;
  readonly id: string;
  readonly image: string;
  readonly image_url: string;
  readonly info: ITokenInfo;
  readonly name: string;
  readonly percent_of_set: string;
  readonly price_usd: string;
  readonly quantity: string;
  readonly symbol: string;
  readonly units: string;
}

export interface ITokenLockings {
  [key: string]: boolean;
}

export interface ITokensAwaitingMetaMask {
  [id: string]: boolean;
}

export interface ITradingPair {
  readonly address: string;
  readonly id: string;
  readonly image_url: string;
  readonly name: string;
  readonly price_eth: string;
  readonly price_usd: string;
  readonly symbol: string;
  readonly decimals: number;
}

export interface ITransaction {
  id: string;
  status: string;
  type: string;
  title: string;
  description: string;
  price?: string;
  price_usd?: string;
}

export interface IUnits {
  units: BigNumber[];
  naturalUnit: BigNumber;
}

export interface IUser {
  pending_transactions_value_usd: string;
  sets: {
    id: string;
    address: string;
    name: string;
    image: string;
    price_usd: string;
    daily_percent_change: string;
  }[];
  transactions: any[];
}

export interface ITrader {
  address?: string;
  username: string;
  first_name: string;
  last_name: string;
  description?: string;
  image_url?: string;
  email?: string;
  company?: string;
  website?: string;
  twitter?: string;
  linked_in?: string;
  total_market_cap?: string;
  total_market_cap_eth?: string;
  total_market_cap_btc?: string;
  total_followers?: number;
  total_holders?: number;
  set_count?: number;
  last_activity_at?: string;
  created_at?: string;
  funds?: ITraderFund[];
  sets?: any[];
  components?: IToken[];
}

export interface IUnactualizedFee {
  usd_value: string;
  set_value: string;
}

export interface IVictoryLabelData {
  x: string;
  y: BigNumber;
}

export interface IWindowDimensions {
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isTabletLandscape: boolean;
  width: number;
  scrollPercent: number;
  shouldRevealStickyNavBar: boolean;
  hasScrolledBelowFold: boolean;
}

export interface IZeroMappings {
  [key: string]: boolean;
}

export interface IKyberTrade {
  source_token: string;
  source_quantity: string;
  destination_token: string;
  destination_quantity: string;
  minimum_conversion_rate: string;
}

export interface IZeroExOrder {
  exchange_id: string;
  exchange_address: string;
  sender_address: string;
  maker_address: string;
  taker_address: string;
  maker_asset_data: string;
  taker_asset_data: string;
  maker_asset_amount: string;
  taker_asset_amount: string;
  fee_recipient_address: string;
  maker_fee: string;
  taker_fee: string;
  expiration_time_seconds: string;
  salt: string;
  signature: string;
  fill_amount: string;
}

export interface IBuySellPrice {
  collateralizing_set: string;
  collateralizing_set_quantity: string;
  cost_basis: string;
  gas_limit: string;
  gas_price: string;
  quantity: string;
  received_quantity: string;
  total_price: string;
  display: IOrderDisplay;
  receive_tokens: IExchangeComponent[];
  send_tokens: IExchangeComponent[];
  trades: IKyberTrade[];
  orders: IZeroExOrder[];
}
export type NavIssuanceDisplay = {
  from_quantity: string;
  from_token_price_usd: string;
  to_quantity: string;
  to_token_price_usd: string;
  input_value_usd: string;
  output_value_usd: string;
  gas_price_usd: string;
  gas_price_eth: string;
  fee_percentage: string; // TODO: probably renamed to premium
  total_price_usd: string;
  total_price_currency: string;
};
export type NavIssuanceData = {
  input_token_address: string;
  output_token_address: string;
  input_token_quantity: string;
  output_token_quantity: string;
  gas_cost: string;
  gas_price: string;
  display: NavIssuanceDisplay;
};

export type UniswapPriceDisplay = {
  from_quantity: string;
  from_token_price_usd: string;
  to_quantity: string;
  to_token_price_usd: string;
  input_value_usd: string;
  output_value_usd: string;
  gas_price_usd: string;
  gas_price_eth: string;
  slippage: string;
  total_price_usd: string;
  total_price_currency: string;
};
export type UniswapPriceData = {
  amount_in: string;
  amount_out: string;
  path: string[];
  deadline: number;
  gas_cost: string;
  gas_price: string;
  display: UniswapPriceDisplay;
  trade_type: 'exact_out' | 'exact_in';
};

export type TradeModuleData = {
  to: string;
  from: string;
  to_token_address: string;
  from_token_address: string;
  calldata: any;
  gas: string;
  gas_price: string;
  slippage_percentage: string;
  to_token_amount: string;
  from_token_amount: string;
};

export type TradeModuleDisplay = {
  to_token_display_amount: string;
  from_token_display_amount: string;
  gas_costs_usd: string;
  fee_percentage: string;
  value: string;
  to_token: string;
  from_token: string;
};

export interface IRebalanceAuction {
  readonly id: string;
  readonly image: string;
  readonly market_cap: string;
  readonly name: string;
  readonly rebalance_criteria?: string | IRebalancingCriteria;
  readonly rebalancing_time: number;
  readonly status: string;
  readonly symbol: string;
  readonly estimated_time_to_fair_value?: string;
  readonly progress?: string;
  readonly minimum_bid?: string;
  readonly remaining_shares?: string;
  readonly current_auction_price?: string;
  readonly percentage_to_fair_value?: string;
  readonly inflows?: IRebalanceAuctionFlow[];
  readonly outflows?: IRebalanceAuctionFlow[];
  readonly bids?: IBid[];
  readonly is_trading_pool?: boolean;
  readonly last_chunk_end_at?: number;
  readonly set_creator_name?: string;
  readonly set_creator_image?: string;
  readonly auction_size?: string;
  readonly chunk_title?: string;
  readonly current_auction_chunk?: string;
  readonly total_auction_size?: string;
}

export interface IRebalanceAuctionFlow {
  readonly allows_multiple_currencies: boolean;
  readonly allowed_currencies: IComponentToken[];
}

export interface IBid {
  readonly bidder: string;
  readonly bid_amount_usd: string;
  readonly gain_loss: string;
  readonly auction_price: string;
  readonly timestamp: string;
  readonly transaction_id: string;
}

export type ISetModule = {
  readonly name: string;
  readonly image_url: string;
  readonly module_type: string;
};

export interface IAPIErrorObject {
  statusCode: number;
  type: string;
  message: string;
  link: string;
  additionalData?: any;
}

export interface ILiquidatorData {
  chunk_size?: string;
  chunk_period?: string;
  buy_auction_start_price: string;
  sell_auction_start_price: string;
  liquidator_percentage: number;
}

/**
 * Table typings
 */

export enum HeaderSortStatus {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

export interface IHeaderCell {
  label: string;
  customStyle?: any;
  status?: HeaderSortStatus;
  onHeaderCellClick?: (...args: any[]) => any;
}

export interface IRowData {
  cellData: Array<string | number | ComponentType | JSX.Element>;
  customStyle?: any;
  onRowClick?: (...args: any[]) => any;
}
