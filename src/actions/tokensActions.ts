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
      .create()
      .get('https://bafybeia2zujfb5qraeekvil62gxemmzumvigoe4lymtqxo2ey4jdlt3p7i.ipfs.dweb.link')
      .then(response => {
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
            };
          });
        coins.push({
          id: (id++).toString(),
          name: 'Wrapped Ether',
          symbol: 'WETH',
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          decimals: 18,
        });

        return dispatch(receiveTokens(coins));
      })
      .catch((error: any) => {
        if (!error) return;

        console.error(error);
      });
  };
}
