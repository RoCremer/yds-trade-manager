import axios from 'axios';
import { Dispatch } from 'redux';

import { emptyActionGenerator } from '@utils/reduxHelpers';

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
      .get(
        'https://raw.githubusercontent.com/sushiswap/default-token-list/master/src/tokens/mainnet.json',
      )
      .then(response => {
        console.log(response.data.tokens);
        let id = 0;
        let coins = response.data.tokens
          .filter(token => token.chainId === 1)
          .map(token => {
            return {
              id: (id++).toString(),
              name: token.name,
              symbol: token.symbol,
              address: token.address,
              decimals: token.decimals,
              image_url: token.logoURI,
            };
          });

        return dispatch(receiveTokens(coins));
      })
      .catch((error: any) => {
        if (!error) return;

        console.error(error);
      });
  };
}
