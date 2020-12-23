import {
  SET_TRADER_MODULE_INPUT_TOKEN_MODAL_OPEN,
  SET_TRADER_MODULE_INPUT_TOKEN_MODAL_CLOSED,
  SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_OPEN,
  SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_CLOSED,
  TRADER_MODULE_SELECT_INPUT_TOKEN,
  TRADER_MODULE_SELECT_OUTPUT_TOKEN,
  TRADER_MODULE_REQUEST_ORDER_DATA,
  TRADER_MODULE_RECEIVE_ORDER_DATA,
  TRADER_MODULE_SET_INPUT_QUANTITY,
} from '@actions/tradeModuleActions';
import { IAction, IToken, OrderData } from '@typings/index';

interface ITradeModuleReducerState {
  isFetchingOrderData: boolean;
  isSelectingInputToken: boolean;
  isSelectingOutputToken: boolean;
  inputToken: IToken;
  outputToken: IToken;
  orderData: OrderData;
  inputQuantity: string;
  currentBalance: string;
  isFetchingCurrentBalance: boolean;
}

const initialState: ITradeModuleReducerState = {
  isFetchingOrderData: false,
  isSelectingInputToken: false,
  isSelectingOutputToken: false,
  inputToken: {} as IToken,
  outputToken: {} as IToken,
  orderData: {} as OrderData,
  inputQuantity: '',
  currentBalance: '',
  isFetchingCurrentBalance: false,
};

const tradeModuleReducer = (state = initialState, action: IAction): ITradeModuleReducerState => {
  switch (action.type) {
    case SET_TRADER_MODULE_INPUT_TOKEN_MODAL_OPEN:
      return {
        ...state,
        isSelectingInputToken: true,
      };
    case SET_TRADER_MODULE_INPUT_TOKEN_MODAL_CLOSED:
      return {
        ...state,
        isSelectingInputToken: false,
      };
    case SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_OPEN:
      return {
        ...state,
        isSelectingOutputToken: true,
      };
    case SET_TRADER_MODULE_OUTPUT_TOKEN_MODAL_CLOSED:
      return {
        ...state,
        isSelectingOutputToken: false,
      };
    case TRADER_MODULE_SELECT_INPUT_TOKEN:
      return {
        ...state,
        inputToken: action.payload,
      };
    case TRADER_MODULE_SELECT_OUTPUT_TOKEN:
      return {
        ...state,
        outputToken: action.payload,
      };
    case TRADER_MODULE_REQUEST_ORDER_DATA:
      return {
        ...state,
        isFetchingOrderData: true,
      };
    case TRADER_MODULE_RECEIVE_ORDER_DATA:
      return {
        ...state,
        isFetchingOrderData: false,
        orderData: action.payload,
      };
    case TRADER_MODULE_SET_INPUT_QUANTITY:
      return {
        ...state,
        inputQuantity: action.payload,
      };
    default:
      return state;
  }
};

export default tradeModuleReducer;
