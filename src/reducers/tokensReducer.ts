import { REQUEST_TOKENS, RECEIVE_TOKENS } from '../actions/tokensActions';
import { IAction, IToken } from '@typings/index';

const initialState = {
  isFetchingTokens: false,
  tokensFromApi: [] as IToken[],
};

const tokensReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case REQUEST_TOKENS:
      return {
        ...state,
        isFetchingTokens: true,
      };
    case RECEIVE_TOKENS:
      return {
        ...state,
        isFetchingTokens: false,
        tokensFromApi: action.tokens,
        receivedAt: action.receivedAt,
      };
    default:
      return state;
  }
};

export default tokensReducer;
