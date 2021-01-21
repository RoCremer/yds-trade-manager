import axios from 'axios';
import debounce from 'lodash/debounce';
import { BigNumber as EthersBigNumber } from 'ethers/utils';

import { emptyActionGenerator, payloadActionGenerator } from '@utils/reduxHelpers';
import { BigNumber, userRejectedMetamaskTransaction } from '@utils/index';
import {
  resetTransactionWatcher,
  submitSetJSTransaction,
} from '@actions/transactionWatcherActions';

import {
  tradeModuleInputTokenSelector,
  tradeModuleOutputTokenSelector,
  fundDetailsSelector,
  tradeModuleInputQuantitySelector,
  setJSInstanceSelector,
  tradeModuleOrderDataSelector,
  accountSelector,
} from '../selectors/baseSelectors';
import { TX_OPTS, ETHEREUM_ADDRESSES } from '@constants/index';

/* Action Types */
export const SET_TRADER_MODULE_INPUT_TOKEN_MODAL_OPEN = 'SET_TRADER_MODULE_INPUT_TOKEN_MODAL_OPEN';
export const SET_TRADER_MODULE_INPUT_TOKEN_MODAL_CLOSED =
  'SET_TRADER_MODULE_INPUT_TOKEN_MODAL_CLOSED';
export const SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_OPEN =
  'SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_OPEN';
export const SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_CLOSED =
  'SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_CLOSED';
export const TRADER_MODULE_SELECT_INPUT_TOKEN = 'TRADER_MODULE_SELECT_INPUT_TOKEN';
export const TRADER_MODULE_SELECT_OUTPUT_TOKEN = 'TRADER_MODULE_SELECT_OUTPUT_TOKEN';

export const TRADER_MODULE_REQUEST_ORDER_DATA = 'TRADER_MODULE_REQUEST_ORDER_DATA';
export const TRADER_MODULE_RECEIVE_ORDER_DATA = 'TRADER_MODULE_RECEIVE_ORDER_DATA';

export const TRADER_MODULE_SET_INPUT_QUANTITY = 'TRADER_MODULE_SET_INPUT_QUANTITY';

/* Action Creators */
export const setInputTokenModalOpen = emptyActionGenerator(
  SET_TRADER_MODULE_INPUT_TOKEN_MODAL_OPEN,
);
export const setInputTokenModalClosed = emptyActionGenerator(
  SET_TRADER_MODULE_INPUT_TOKEN_MODAL_CLOSED,
);
export const setOutputTokenModalOpen = emptyActionGenerator(
  SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_OPEN,
);
export const setOutputTokenModalClosed = emptyActionGenerator(
  SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_CLOSED,
);
export const selectInputToken = payloadActionGenerator(TRADER_MODULE_SELECT_INPUT_TOKEN);
export const selectOutputToken = payloadActionGenerator(TRADER_MODULE_SELECT_OUTPUT_TOKEN);
export const setInputQuantity = payloadActionGenerator(TRADER_MODULE_SET_INPUT_QUANTITY);

export const requestTradeOrderData = emptyActionGenerator(TRADER_MODULE_REQUEST_ORDER_DATA);
export const receiveTradeOrderData = payloadActionGenerator(TRADER_MODULE_RECEIVE_ORDER_DATA);

export const submitTradeOrder = () => (dispatch: any, getState: any) => {
  const state = getState();
  const orderData = tradeModuleOrderDataSelector(state);
  const setJSInstance = setJSInstanceSelector(state);
  const fundDetails = fundDetailsSelector(state);
  const userAddress = accountSelector(state);

  const transactionOptions = {
    gasPrice: new EthersBigNumber(orderData.gas_price),
    gasLimit: new EthersBigNumber(TX_OPTS.tradingModuleGasLimit),
  };

  const oneInchTrade = () => {
    const sendQuantity = new EthersBigNumber(orderData.from_token_amount);
    const minReceivedQuantity = new EthersBigNumber(orderData.to_token_amount);
    setJSInstance.trade.tradeModuleWrapper.tradeModuleAddress =
      ETHEREUM_ADDRESSES.TREASURY_TRADE_ADAPTER;
    console.log(transactionOptions);
    transactionOptions.gasLimit = undefined;
    return setJSInstance.trade.tradeAsync(
      fundDetails.address,
      'OneInchExchangeAdapter',
      orderData.from_token_address,
      sendQuantity,
      orderData.to_token_address,
      minReceivedQuantity,
      orderData.calldata,
      userAddress,
      transactionOptions,
    );
  };

  const tradeRequest = submitSetJSTransaction(oneInchTrade);

  try {
    dispatch(tradeRequest);
  } catch (e) {
    if (userRejectedMetamaskTransaction(e)) {
      dispatch(resetTransactionWatcher());
      return;
    }
  }
};

const fetch1InchOrderData = async (
  setAddress: string,
  fromDecimals: string,
  fromAddress: string,
  toAddress: string,
  amount: string,
) => {
  try {
    const response = await axios.get('v2/funds/trade_quote', {
      params: {
        from_token_address: fromAddress,
        to_token_address: toAddress,
        amount: new BigNumber(amount).mul(10 ** Number(fromDecimals)).toString(),
        from_address: setAddress,
      },
    });

    return response.data.trade_quote;
  } catch (error) {
    return null;
  }
};

// Is this going to export multiple debounced things
export const debouncedFetch1InchOrderData = debounce(
  async (dispatch: any, orderRequestParams: [string, string, string, string, string]) => {
    const orderData = await fetch1InchOrderData(...orderRequestParams);
    dispatch(receiveTradeOrderData(orderData));
  },
  250,
  { trailing: true },
);

export const getTradeOrderData = () => (dispatch: any, getState: any) => {
  const state = getState();
  const inputToken = tradeModuleInputTokenSelector(state);
  const outputToken = tradeModuleOutputTokenSelector(state);
  const fundDetails = fundDetailsSelector(state);
  const inputQuantity = tradeModuleInputQuantitySelector(state);

  // const requestQuantity = tradeRequestQuantitySelector
  const orderDataParams: [string, string, string, string, string] = [
    fundDetails.address,
    inputToken.decimals,
    inputToken.address,
    outputToken.address,
    inputQuantity,
  ];

  dispatch(requestTradeOrderData());

  debouncedFetch1InchOrderData(dispatch, orderDataParams);
};
