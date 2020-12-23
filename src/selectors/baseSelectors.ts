import SetProtocol from 'setprotocol.js';
import Web3 from 'web3';
import {
  IToken,
  IWindowDimensions,
  FundDetails,
} from '@typings/index';
import { TransactionStep } from '@containers/TransactionWatcher/enums';

// fundDetailsReducer.ts
export const isFetchingFundDetailsSelector = (state: any): boolean =>
  state.fundDetails.isFetchingFundDetails;
export const fundDetailsSelector = (state: any): FundDetails => state.fundDetails.fundDetails;

// setprotocolReducer.ts
export const setProtocolInstanceSelector = (state: any): SetProtocol =>
  state.setProtocol.setProtocolInstance;

// setJSReducer.ts
// TODO: add proper typing once set.js is fixed
export const setJSInstanceSelector = (state: any): any => state.setJS.setJSInstance;

// tokensReducer.ts
export const isFetchingTokensSelector = (state: any): false => state.tokens.isFetchingTokens;
export const tokensFromApiSelector = (state: any): IToken[] => state.tokens.tokensFromApi;

// traderModuleReducer.ts
export const tradeModuleIsInputTokenModalOpenSelector = (state: any): boolean =>
  state.tradeModule.isSelectingInputToken;
export const tradeModuleIsOutputTokenModalOpenSelector = (state: any): boolean =>
  state.tradeModule.isSelectingOutputToken;
export const tradeModuleInputTokenSelector = (state: any): any => state.tradeModule.inputToken;
export const tradeModuleOutputTokenSelector = (state: any): any => state.tradeModule.outputToken;
export const tradeModuleInputQuantitySelector = (state: any): any =>
  state.tradeModule.inputQuantity;
export const tradeModuleOrderDataSelector = (state: any): any => state.tradeModule.orderData;
export const tradeModuleIsFetchingOrderDataSelector = (state: any): any =>
  state.tradeModule.isFetchingOrderData;

// transactionWatcherReducer.ts
export const transactionStepSelector = (state: any): TransactionStep =>
  state.transactionWatcher.transactionStep;
export const transactionIdSelector = (state: any): string | undefined =>
  state.transactionWatcher.transactionId;

// web3Reducer.ts
export const accountSelector = (state: any): string => state.web3.account;
export const emailSelector = (state: any): string => state.web3.email;
export const usernameSelector = (state: any): string => state.web3.username;
export const isLoggedInSelector = (state: any): boolean => state.web3.isLoggedIn;
export const isLoginModalOpenSelector = (state: any): boolean => state.web3.isLoginModalOpen;
export const providerTypeSelector = (state: any): string => state.web3.providerType;
export const networkIdSelector = (state: any): string => state.web3.networkId;
export const web3InstanceSelector = (state: any): Web3 => state.web3.web3Instance;
export const ledgerPathSelector = (state: any): string => state.web3.ledgerPath;

// windowDimensionReducer.ts
export const windowDimensionSelector = (state: any): IWindowDimensions => state.windowDimension;
export const widthSelector = (state: any): string => state.windowDimension.width;
export const heightSelector = (state: any): string => state.windowDimension.height;
export const scrollPercentSelector = (state: any): number => state.windowDimension.scrollPercent;
export const shouldRevealStickyNavBarSelector = (state: any): boolean =>
  state.windowDimension.shouldRevealStickyNavBar;
export const hasScrolledBelowFoldSelector = (state: any): boolean =>
  state.windowDimension.hasScrolledBelowFold;
