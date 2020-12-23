import axios from 'axios';

import { emptyActionGenerator, payloadActionGenerator } from '@utils/index';

export const REQUEST_FUND_DETAILS_DATA = 'REQUEST_FUND_DETAILS_DATA';
export const RECEIVE_FUND_DETAILS_DATA = 'RECEIVE_FUND_DETAILS_DATA';

export const requestFundDetailsData = emptyActionGenerator(REQUEST_FUND_DETAILS_DATA);
export const receiveFundDetailsData = payloadActionGenerator(RECEIVE_FUND_DETAILS_DATA);

const requestFundDetails = async (fundId: string) => {
  try {
    const response = await axios.get(`/v2/funds/${fundId}`);
    return response.data.fund;
  } catch (e) {
    return null;
  }
};

export const fetchFundDetails = (fundId: string) => async (dispatch: any) => {
  dispatch(requestFundDetailsData());

  const fundDetails = await requestFundDetails(fundId);

  dispatch(receiveFundDetailsData(fundDetails || {}));

  return fundDetails;
};

export const fetchFundDetailsForSetManager = (fundId: string) => async (dispatch: any) => {
  dispatch(requestFundDetailsData());

  const fundDetails = await requestFundDetails(fundId);

  dispatch(receiveFundDetailsData(fundDetails || {}));

  return fundDetails;
};