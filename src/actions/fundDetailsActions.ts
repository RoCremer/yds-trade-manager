import Web3 from 'web3';

import { emptyActionGenerator, payloadActionGenerator } from '@utils/index';
import { ETHEREUM_CONSTANTS, ETHEREUM_ADDRESSES } from '@constants/index';

export const REQUEST_FUND_DETAILS_DATA = 'REQUEST_FUND_DETAILS_DATA';
export const RECEIVE_FUND_DETAILS_DATA = 'RECEIVE_FUND_DETAILS_DATA';

export const requestFundDetailsData = emptyActionGenerator(REQUEST_FUND_DETAILS_DATA);
export const receiveFundDetailsData = payloadActionGenerator(RECEIVE_FUND_DETAILS_DATA);
const web3 = new Web3(ETHEREUM_CONSTANTS.NODE_URL);
const SET_CONTRACT = new web3.eth.Contract(ETHEREUM_CONSTANTS.SET_ABI, ETHEREUM_ADDRESSES.HOUSE);

const requestFundDetails = async () => {
  try {
    let comps = await SET_CONTRACT.methods.getComponents().call();
    console.log(comps);
    let components: any[] = await getComponentData(comps);

    return {
      id: 'sushiHOUSE',
      name: 'Sushi DAO House',
      address: '0x7b18913d945242a9c313573e6c99064cd940c6af',
      components,
    };
  } catch (e) {
    return null;
  }
};

export const fetchFundDetails = () => async (dispatch: any) => {
  dispatch(requestFundDetailsData());

  const fundDetails = await requestFundDetails();

  dispatch(receiveFundDetailsData(fundDetails || {}));

  return fundDetails;
};

export const fetchFundDetailsForSetManager = () => async (dispatch: any) => {
  dispatch(requestFundDetailsData());

  const fundDetails = await requestFundDetails();

  dispatch(receiveFundDetailsData(fundDetails || {}));

  return fundDetails;
};

async function getComponentData(comps: any): Promise<Array<any>> {
  return await Promise.all(
    comps.map(async (component: any) => {
      let componentContract = new web3.eth.Contract(ETHEREUM_CONSTANTS.ERC20_ABI, component);
      let decimals = await componentContract.methods.decimals().call();
      let symbol = await componentContract.methods.symbol().call();
      let name = await componentContract.methods.name().call();
      let totalPositionSize = BigInt(
        (await componentContract.methods.balanceOf(ETHEREUM_ADDRESSES.HOUSE).call()).toString(),
      );
      return {
        decimals,
        name,
        symbol,
        address: component,
        full_amount_in_set: bigIntToDecimalString(totalPositionSize, decimals),
      };
    }),
  );
}

function bigIntToDecimalString(amount: bigint, decimals: number): string {
  let amountString = amount.toString();
  while (amountString.length < decimals) {
    amountString = '0' + amountString;
  }
  let position = amountString.length - decimals;
  return [amountString.slice(0, position), '.', amountString.slice(position)].join('');
}
