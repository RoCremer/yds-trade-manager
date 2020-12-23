import SetJS from 'set.js';
import { Provider } from 'web3/providers';

import { SETJS_CONFIG } from '@constants/index';
import { payloadActionGenerator } from '@utils/index';

export const INITIALIZE_SETJS = 'INITIALIZE_SETJS';
export const createSetJSInstance = payloadActionGenerator(INITIALIZE_SETJS);

/*
 * Initializes SetJS with addresses from process.env and stores it in Redux.
 */
export const initializeSetJS = (currentProvider: Provider) => (dispatch: any) => {
  const setJSConfig = SETJS_CONFIG;
  const setJS = new SetJS(currentProvider, setJSConfig);

  dispatch(createSetJSInstance(setJS));
};
