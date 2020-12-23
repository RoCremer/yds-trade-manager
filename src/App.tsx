/* global process */

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios, { AxiosResponse, AxiosError } from 'axios';
// CSS packages
import 'animate.css/animate.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-modal-video/css/modal-video.min.css';
import ErrorBoundary from '@containers/ErrorBoundary';
import MissingRoute from '@containers/MissingRoute';
import Modals from '@containers/Modals';
import NavBar from '@containers/NavBar';
import TradeModule from '@containers/TradeModule';
import {
  updateWindowDimension as updateWindowDimensionAction,
  updateScrollPosition as updateScrollPositionAction,
} from '@actions/windowDimensionActions';
import { initializeSetJS } from '@actions/setJSActions';
import { checkLoginStatus as checkLoginStatusAction } from '@actions/web3Actions';
import { fetchTokens as fetchTokensAction } from '@actions/tokensActions';
import { IWindowDimensions } from '@typings/index';
import { initWeb3, initSetProtocol } from '@utils/index';
// Styles
import './App.css';

export interface IAppProps {
  account: string;
  history: any;
  location: {
    pathname: string;
    key: string;
    search: string;
  };
  networkId: string;
  providerType: string;
  store: any;
  windowDimension: IWindowDimensions;
  fetchTokens: (...args: any[]) => any;
  updateWindowDimension: (...args: any[]) => any;
  updateScrollPosition: (...args: any[]) => any;
  initializeSetJS: (...args: any[]) => any;
}

interface IRoutes {
  path: string;
  name: string;
  Component: any;
}

const loggedOutRoutes: IRoutes[] = [
  { path: '/404', name: 'MissingRoute', Component: MissingRoute },
];

const loggedInRoutes: IRoutes[] = [
  { path: '/', name: 'Default', Component: TradeModule }, // Krugman added
  { path: '/v2/trade/:set', name: 'Trader Module', Component: TradeModule },
  { path: '/404', name: 'MissingRoute', Component: MissingRoute },
];

class App extends Component<IAppProps> {
  constructor(props: any) {
    super(props);

    this.setupAxios();

    props.checkLoginStatus();
    props.fetchTokens();
    if (props.providerType) {
      const web3Instance = initWeb3();
      if (web3Instance) {
        initSetProtocol(web3Instance.currentProvider);
        props.initializeSetJS(web3Instance.currentProvider);
      }
    }
  }

  componentDidMount() {
    const {
      updateWindowDimension,
      updateScrollPosition,
    } = this.props;
    if (process.env.NODE_ENV === 'test') return;
    // Listen for window resizing, and update `windowDimension` in Redux
    window.addEventListener('resize', updateWindowDimension);
    window.addEventListener('scroll', updateScrollPosition);
    if (window.outerWidth > 0 && window.outerHeight > 0) {
      // Sometimes window hasn't fully loaded yet so we shouldn't set to 0 in those
      // cases
      updateWindowDimension();
    }
  }

  componentWillUnmount() {
    const { updateWindowDimension, updateScrollPosition } = this.props;
    window.removeEventListener('resize', updateWindowDimension);
    window.removeEventListener('scroll', updateScrollPosition);
  }

  setupAxios = () => {
    // Set axios defaults
    axios.defaults.baseURL = process.env.API_URL;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    // Add a request interceptor. Formats all outgoing requests with same headers/params if available.
    axios.interceptors.request.use(
      config => {
        const { account } = this.props;
        // Add in account as X-SET-USER header if logged in
        // Add in beta flag if environment is beta enabled
        return {
          ...config,
          headers: {
            ...config.headers,
            ...(account && { 'X-SET-USER': account }),
          },
          params: {
            ...config.params,
            ...(!!+process.env.IS_BETA && { beta: true }),
          },
        };
      },
      error => {
        return Promise.reject(error);
      },
    );

    /** Adds a response interceptor for global error handling.
     * If an error response has been handled in here, Promise.reject(null) to pass a null error object
     * to the caller's .catch block.
     * The caller's catch block should check for null error objects before doing any more error handling.
     */
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // If the error response is undefined, there could be a CORS issue,
        // firewall, or browser extension blocking the request
        if (error && typeof error.response === 'undefined') {
          return Promise.reject(null);
        }

        return Promise.reject(error);
      },
    );
  };

  /**
   * Used to determine if the app should have padding. Returns a boolean.
   */
  determineAppPadding = (path: string, prevProps: IAppProps): boolean => {
    const { location } = this.props;
    return (
      !location.pathname.includes(path) &&
      prevProps.location.pathname.includes(path) &&
      document.body.style.paddingBottom === '0px'
    );
  };

  render() {
    const {
      account,
      history,
      location,
    } = this.props;

    const routes: IRoutes[] = account ? loggedInRoutes : loggedOutRoutes;

    return (
      <div className="App">
        <ErrorBoundary activeItem={location.pathname} history={history}>
          <NavBar activeItem={location.pathname} history={history} />
          <TransitionGroup>
            <Switch>
              {routes.map(({ path, Component }) => {
                return (
                  <Route key={path} exact path={path}>
                    {(input: any) => {
                      const newProps = {
                        ...this.props,
                        match: input.match,
                      };
                      return (
                        <CSSTransition
                          in={input.match != null}
                          key={location.key}
                          classNames="fade"
                          timeout={500}
                          unmountOnExit
                        >
                          <Component {...newProps} />
                        </CSSTransition>
                      );
                    }}
                  </Route>
                );
              })}
              <Route component={MissingRoute} />
            </Switch>
          </TransitionGroup>
          <Modals />
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    account: state.web3.account,
    providerType: state.web3.providerType,
    networkId: state.web3.networkId,
    windowDimension: state.windowDimension,
  };
};

const mapDispatchToProps = {
  checkLoginStatus: checkLoginStatusAction,
  fetchTokens: fetchTokensAction,
  updateWindowDimension: updateWindowDimensionAction,
  updateScrollPosition: updateScrollPositionAction,
  initializeSetJS,
};

export default connect(mapStateToProps, mapDispatchToProps)((App as any) as React.SFC<IAppProps>);
