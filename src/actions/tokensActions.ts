import axios from 'axios';
import { Dispatch } from 'redux';

import { emptyActionGenerator } from '@utils/reduxHelpers';
import { ETHEREUM_CONSTANTS } from '@constants/index';
/* Action Types */
export const REQUEST_TOKENS = 'REQUEST_TOKENS';
export const RECEIVE_TOKENS = 'RECEIVE_TOKENS';

/* Action Creators */
const requestTokens = emptyActionGenerator(REQUEST_TOKENS);

function receiveTokens(json: any) {
  return {
    type: RECEIVE_TOKENS,
    tokens: json,
    receivedAt: Date.now(),
  };
}

export function fetchTokens() {
  return (dispatch: Dispatch<Function>) => {
    dispatch(requestTokens());
    return axios
      .get('/v1/coins')
      .then(response => {
        console.log(response.data.coins);
        response.data.coins.push(...ETHEREUM_CONSTANTS.TOKENS);
        return dispatch(receiveTokens(response.data.coins));
      })
      .catch((error: any) => {
        if (!error) return;

        console.error(error);
      });
  };
}
