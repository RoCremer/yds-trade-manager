import SetProtocol from 'setprotocol.js';
import { INITIALIZE_SET_PROTOCOL } from '@actions/setProtocolActions';

interface InitialState {
  setProtocolInstance: SetProtocol;
}

const initialState: InitialState = {
  setProtocolInstance: {} as SetProtocol,
};

const setInstance = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZE_SET_PROTOCOL:
      return {
        ...state,
        setProtocolInstance: action.payload,
      };
    default:
      return state;
  }
};

export default setInstance;
