import { css, StyleSheet } from 'aphrodite';
import React, { PureComponent } from 'react';

import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';

const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  LoginOptions_container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  LoginOptions_button: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 500,
    padding: '12px',
    marginBottom: '15px',
    width: '48%',
    [MOBILE_MEDIA_QUERY]: {
      width: '100%',
      height: '65px',
    },
  },
  LoginOptions_buttonSubText: {
    color: COLORS.white,
    fontWeight: 400,
    fontSize: '14px',
  },
  LoginOptions_loginOptionIcon: {
    marginRight: '10px',
    height: '20px',
    width: '20px',
  },
});

interface LoginOptionsProps {
  isMobile: boolean;
  metaMaskEnabled: boolean;
  metaMaskMobileEnabled: boolean;
  operaWalletEnabled: boolean;
  loginWithWalletLink: (...args: any[]) => any;
  loginWithLedger: (...args: any[]) => any;
  loginWithMetamask: (...args: any[]) => any;
  loginWithOpera: (...args: any[]) => any;
  loginWithWalletConnect: (...args: any[]) => any;
}

class LoginOptions extends PureComponent<LoginOptionsProps> {
  render() {
    const {
      isMobile,
      metaMaskEnabled,
      metaMaskMobileEnabled,
      operaWalletEnabled,
      loginWithWalletLink,
      loginWithLedger,
      loginWithMetamask,
      loginWithOpera,
      loginWithWalletConnect,
    } = this.props;

    const coinbaseWalletColumn = (
      <button
        className={`${css(styles.LoginOptions_button)} button-secondary`}
        onClick={loginWithWalletLink}
      >
        <img
          alt="login icon"
          className={css(styles.LoginOptions_loginOptionIcon)}
          src="https://set-core.s3.amazonaws.com/img/wallets/coinbase-wallet.svg"
        />
        Coinbase Wallet
      </button>
    );

    const ledgerColumn = (
      <button
        className={`${css(styles.LoginOptions_button)} button-secondary`}
        onClick={loginWithLedger}
      >
        <img
          alt="login icon"
          className={css(styles.LoginOptions_loginOptionIcon)}
          src="https://set-core.s3.amazonaws.com/img/wallets/ledger.svg"
        />
        Ledger
      </button>
    );

    const metamaskColumn = (metaMaskEnabled || metaMaskMobileEnabled) && (
      <button
        className={`${css(styles.LoginOptions_button)} button-secondary`}
        onClick={loginWithMetamask}
      >
        <img
          alt="login icon"
          className={css(styles.LoginOptions_loginOptionIcon)}
          src="https://set-core.s3.amazonaws.com/img/wallets/metamask.svg"
        />
        Metamask
      </button>
    );

    const operaColumn = (
      <button
        className={`${css(styles.LoginOptions_button)} button-secondary`}
        onClick={loginWithOpera}
      >
        <img
          alt="login icon"
          className={css(styles.LoginOptions_loginOptionIcon)}
          src="https://set-core.s3.amazonaws.com/img/wallets/opera.png"
        />
        Opera
      </button>
    );

    const walletConnect = (
      <button
        className={`${css(styles.LoginOptions_button)} button-secondary`}
        onClick={loginWithWalletConnect}
      >
        <img
          alt="login icon"
          className={css(styles.LoginOptions_loginOptionIcon)}
          src="https://set-core.s3.amazonaws.com/img/wallets/walletconnect.svg"
        />
        WalletConnect
      </button>
    );

    if (isMobile) {
      return (
        <div className={css(styles.LoginOptions_container)}>
          {coinbaseWalletColumn}
          {walletConnect}
        </div>
      );
    }

    return (
      <div className={css(styles.LoginOptions_container)}>
        {coinbaseWalletColumn}
        {ledgerColumn}
        {walletConnect}
        {operaWalletEnabled ? operaColumn : metamaskColumn}
      </div>
    );
  }
}

export default LoginOptions;
