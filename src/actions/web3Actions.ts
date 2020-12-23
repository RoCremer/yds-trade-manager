import { toast } from 'react-toastify';

import i18n from '../i18n';
import {
  getAccount,
  getNetworkId,
  login,
  getWeb3Instance,
} from '@utils/index';
import { emptyActionGenerator, payloadActionGenerator } from '@utils/reduxHelpers';

export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const LOG_OUT = 'LOG_OUT';
export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const SELECT_PROVIDER_TYPE = 'SELECT_PROVIDER_TYPE';
export const SET_CURRENT_NETWORK_ID = 'SET_CURRENT_NETWORK_ID';
export const SET_LEDGER_PATH = 'SET_LEDGER_PATH';
export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const CLEAR_AFTER_LOGIN_ACTION = 'CLEAR_AFTER_LOGIN_ACTION';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export const closeLoginModal = emptyActionGenerator(CLOSE_LOGIN_MODAL);
export const logOutAction = emptyActionGenerator(LOG_OUT);
export const openLoginModal = payloadActionGenerator(OPEN_LOGIN_MODAL);
export const clearAfterLoginAction = emptyActionGenerator(CLEAR_AFTER_LOGIN_ACTION);
export const selectProviderType = payloadActionGenerator(SELECT_PROVIDER_TYPE);
export const setCurrentNetworkId = payloadActionGenerator(SET_CURRENT_NETWORK_ID);
export const setLedgerPath = payloadActionGenerator(SET_LEDGER_PATH);
export const updateLoginStatus = payloadActionGenerator(UPDATE_LOGIN_STATUS);
export const updateAccount = payloadActionGenerator(UPDATE_ACCOUNT);

export const receiveAccount = (account: string) => async (
  dispatch: Function,
) => {
  dispatch(updateAccount(account));
};

/**
 * Logs user out of Web3. Logs the user out of MetaMask
 * account data when user logs out.
 *
 * @returns {boolean}
 */
export const logOut = () => (dispatch: Function) => {
  toast(i18n.t('components:toasts.standard.logged-out'));
  dispatch(logOutAction());
};

/**
 * Checks if the user is logged into MetaMask.
 *
 * @returns {boolean}
 */
export const checkLoginStatus = () => async (dispatch: Function, getState: Function) => {
  const {
    web3: { providerType },
  } = getState();
  const web3Instance = getWeb3Instance();

  if (web3Instance) {
    try {
      const account = await getAccount(web3Instance);
      const networkId = await getNetworkId(web3Instance);

      if (account) {
        dispatch(updateLoginStatus(true));
        dispatch(setCurrentNetworkId(String(networkId)));
        dispatch(receiveAccount(account));
      } else {
        dispatch(updateLoginStatus(false));
      }
      return;
    } catch (error) {
      // User denied account access
      console.log(`Error connecting with ${providerType}: `, error);
      dispatch(updateLoginStatus(false));
    }
  }

  dispatch(updateLoginStatus(false));
};


/**
 * Handles login action for the user depending on if their browser is a mobile web3 wallet
 * or a web3 wallet on a desktop browser.
 */
export const handleLogin = (nextAction: string) => async (
  dispatch: Function,
  getState: Function,
) => {
  const {
    windowDimension: { isMobile },
    web3: { account },
  } = getState();

  // If mobile web3 wallet
  if (isMobile && (window.ethereum || window.web3)) {
    if (!account) {
      await login();
    }
    if (nextAction) {
      return;
    }
    // If desktop
  } else {
    dispatch(openLoginModal(nextAction));
  }
};
