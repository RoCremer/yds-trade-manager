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
        let coins = [];

        coins.push({
          id: (id++).toString(),
          name: 'Wrapped Ether',
          symbol: 'WETH',
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          decimals: 18,
        });

        coins.push({
          id: (id++).toString(),
          name: 'Yam Finance',
          symbol: 'YAM',
          address: '0x0aacfbec6a24756c20d41914f2caba817c0d8521',
          decimals: 18,
        });

        response.data.tokens
          .filter(
            token =>
              token.chainId === 1 &&
              token.address.toLowerCase() !== '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
          )
          .forEach(token => {
            coins.push({
              id: (id++).toString(),
              name: token.name,
              symbol: token.symbol,
              address: token.address,
              decimals: token.decimals,
            });
          });

        return dispatch(receiveTokens(coins));
      })
      .catch((error: any) => {
        if (!error) return;

        console.error(error);
      });
  };
}
