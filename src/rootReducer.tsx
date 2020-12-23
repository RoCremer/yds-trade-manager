import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { web3Transform } from '@utils/reduxTransforms';
import reducers from './reducers';

const {
  fundDetailsReducer,
  setProtocolReducer,
  setJSReducer,
  tokensReducer,
  tradeModuleReducer,
  transactionWatcherReducer,
  web3Reducer,
  windowDimensionReducer,
} = reducers;

const web3PersistConfig = {
  key: 'web3',
  storage,
  blacklist: ['isLoginModalOpen', 'web3Instance', 'afterLoginAction'],
};

const fundDetailsPersistConfig = {
  key: 'fundDetails',
  storage,
  blacklist: ['isFetchingFundDetails', 'fundDetails'],
};

const rootReducer = combineReducers({
  fundDetails: persistReducer(fundDetailsPersistConfig, fundDetailsReducer),
  routing: routerReducer,
  setProtocol: setProtocolReducer,
  setJS: setJSReducer,
  tokens: tokensReducer,
  tradeModule: tradeModuleReducer,
  transactionWatcher: transactionWatcherReducer,
  web3: persistReducer(web3PersistConfig, web3Reducer),
  windowDimension: windowDimensionReducer,
});

// Redux persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account', 'approves', 'tokens', 'windowDimension', 'web3'],
  transforms: [web3Transform],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
