import { FundDetails, IFundConfirmedWarningsList } from '@typings/index';
import {
  REQUEST_FUND_DETAILS_DATA,
  RECEIVE_FUND_DETAILS_DATA,
} from '@actions/fundDetailsActions';

const initialState = {
  isFetchingFundDetails: false,
  fundDetails: {} as FundDetails,
  confirmedWarningsList: {} as IFundConfirmedWarningsList,
};

const fundDetailsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST_FUND_DETAILS_DATA:
      return {
        ...state,
        isFetchingFundDetails: true,
        fundDetails: {},
      };

    case RECEIVE_FUND_DETAILS_DATA:
      return {
        ...state,
        isFetchingFundDetails: false,
        fundDetails: action.payload,
      };

    default:
      return state;
  }
};

export default fundDetailsReducer;
