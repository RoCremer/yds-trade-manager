import { fundDetailsSelector } from './baseSelectors';
import { ITrader } from '@typings/index';

export const getCurrentFundDetailsTraderData = (state: any): ITrader => {
  const fundDetails = fundDetailsSelector(state);

  return fundDetails.operator;
};
