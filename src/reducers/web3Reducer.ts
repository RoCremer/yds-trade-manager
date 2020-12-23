import {
  UPDATE_LOGIN_STATUS,
  LOG_OUT,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  SELECT_PROVIDER_TYPE,
  SET_CURRENT_NETWORK_ID,
  SET_LEDGER_PATH,
  UPDATE_ACCOUNT,
} from '@actions/web3Actions';
import Web3 from 'web3';

export interface IWeb3State {
  account: string;
  email: string;
  username: string;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  hasFetchedAccounts: boolean;
  providerType: string;
  networkId: string;
  web3Instance: Web3;
  ledgerPath: string;
}

const initialState: IWeb3State = {
  account: '',
  email: '',
  username: '',
  ledgerPath: '',
  isLoggedIn: false,
  isLoginModalOpen: false,
  hasFetchedAccounts: false,
  providerType: undefined,
  web3Instance: undefined,
  networkId: undefined,
};

const web3Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_LOGIN_STATUS:
      if (!action.payload) {
        return {
          ...state,
          isLoggedIn: false,
          account: '',
          hasFetchedAccounts: false,
          providerType: undefined,
          web3Instance: undefined,
        };
      }
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SELECT_PROVIDER_TYPE:
      return {
        ...state,
        providerType: action.payload,
      };
    case SET_LEDGER_PATH:
      return {
        ...state,
        ledgerPath: action.payload,
      };
    case SET_CURRENT_NETWORK_ID:
      return {
        ...state,
        networkId: action.payload,
      };
    case LOG_OUT:
      return {
        ...initialState,
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        hasFetchedAccounts: true,
      };
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: true,
        afterLoginAction: action.payload ? action.payload : undefined,
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: false,
      };
    default:
      return state;
  }
};

export default web3Reducer;
