import { connect } from 'react-redux';

import TradeModuleWrapper from './TradeModuleWrapper';
import { fetchFundDetailsForSetManager } from '@actions/fundDetailsActions';
import { resetTransactionWatcher } from '@actions/transactionWatcherActions';
import {
  fundDetailsSelector,
  tokensFromApiSelector,
  tradeModuleInputTokenSelector,
  tradeModuleIsInputTokenModalOpenSelector,
  tradeModuleIsOutputTokenModalOpenSelector,
  tradeModuleOutputTokenSelector,
  tradeModuleInputQuantitySelector,
  tradeModuleOrderDataSelector,
  tradeModuleIsFetchingOrderDataSelector,
  windowDimensionSelector,
  transactionIdSelector,
  usernameSelector,
  accountSelector,
} from '@selectors/baseSelectors';
import {
  selectInputToken,
  selectOutputToken,
  setOutputTokenModalClosed,
  setOutputTokenModalOpen,
  setInputTokenModalClosed,
  setInputTokenModalOpen,
  getTradeOrderData,
  setInputQuantity,
  submitTradeOrder,
} from '@actions/tradeModuleActions';

const mapStateToProps = (state: any) => {
  const isSelectingInputToken = tradeModuleIsInputTokenModalOpenSelector(state);
  const isSelectingOutputToken = tradeModuleIsOutputTokenModalOpenSelector(state);
  const selectedInputToken = tradeModuleInputTokenSelector(state);
  const selectedOutputToken = tradeModuleOutputTokenSelector(state);
  const inputQuantity = tradeModuleInputQuantitySelector(state);
  const orderData = tradeModuleOrderDataSelector(state);
  const fundDetails = fundDetailsSelector(state);
  const windowDimensions = windowDimensionSelector(state);
  const enabledOutputTokens = tokensFromApiSelector(state);
  const isFetchingOrderData = tradeModuleIsFetchingOrderDataSelector(state);
  const transactionId = transactionIdSelector(state);
  const username = usernameSelector(state);
  const account = accountSelector(state);

  return {
    isSelectingInputToken,
    isSelectingOutputToken,
    selectedInputToken,
    selectedOutputToken,
    orderData,
    inputQuantity,
    fundDetails,
    enabledOutputTokens,
    windowDimensions,
    isFetchingOrderData,
    transactionId,
    username,
    account,
  };
};

const mapDispatchToProps = {
  onFetchFund: fetchFundDetailsForSetManager,
  onFetchOrderData: getTradeOrderData,
  onSelectInputToken: selectInputToken,
  onSelectOutputToken: selectOutputToken,
  onChangeInputQuantity: setInputQuantity,
  onOpenSelectInputTokenModal: setInputTokenModalOpen,
  onCloseSelectInputTokenModal: setInputTokenModalClosed,
  onOpenSelectOutputTokenModal: setOutputTokenModalOpen,
  onCloseSelectOutputTokenModal: setOutputTokenModalClosed,
  onSubmitTrade: submitTradeOrder,
  onResetTransactionWatcher: resetTransactionWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeModuleWrapper);
