/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Container } from 'semantic-ui-react';

import App from './App';
import { ScrollToTop } from './components';
import { store, persistor } from './store';
import { routerHistory } from './utils';
import './i18n';

const Loader = () => (
  <Container textAlign="center">
    <div className="loading-spinner" />
  </Container>
);

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <Router history={routerHistory}>
        <ScrollToTop>
          <Route path="/:filter?" component={App} />
        </ScrollToTop>
      </Router>
    </PersistGate>
  </Provider>
);

render(<Root />, document.getElementById('root'));
