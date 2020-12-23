// TODO: add proper imported SetJS typings once we get declaration files + module alias fixed on set.js

import { INITIALIZE_SETJS } from '@actions/setJSActions';

type SetJSReducerState = {
  setJSInstance: any;
};

const initialState: SetJSReducerState = {
  setJSInstance: {} as any,
};

const setJSInstance = (state = initialState, action: any): SetJSReducerState => {
  switch (action.type) {
    case INITIALIZE_SETJS:
      return {
        setJSInstance: action.payload,
      };
    default:
      return state;
  }
};

export default setJSInstance;
