import { omit } from 'lodash';
import { createTransform } from 'redux-persist';

import { IWeb3State } from '@reducers/web3Reducer';

export const web3Transform = createTransform((inboundState: IWeb3State | any, key: string) => {
  if (key === 'web3') {
    return omit(inboundState, [
      'fm',
      'provider',
      'web3Instance',
      'isOnboardingModalOpen',
      'networkId',
    ]);
  }
  return inboundState;
}, null);
