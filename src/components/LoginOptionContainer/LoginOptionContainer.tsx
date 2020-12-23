import { css, StyleSheet } from 'aphrodite';
import React, { PureComponent } from 'react';
import { Container, Header, Modal, Loader, Icon, Dimmer } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';

import LoginOptions from './LoginOptions';
import { COLORS, WEB3_PROVIDERS, WINDOW_DIMENSIONS, LEDGER_PATHS } from '@constants/index';
import { Button } from '@components/index';
import braveMetaMaskIcons from '@img/metamask/brave-and-metamask.png';
import leftArrowDark from '@img/icons/left-arrow-dark.svg';
import greenCheckmark from '@img/icons/green-check.svg';
import { LEDGER_WALLET_LOGO } from '@img/logos/index';
import { LEDGER_LOADING_ANIMATION } from '@img/login/index';
import {
  getWeb3,
  getLedgerWeb3,
  getAccount,
  detectOperaWallet,
  isBrave,
  truncateEthAddress,
  ledgerEngine,
} from '@utils/index';

const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  // General
  LoginOptionContainer_content: {
    padding: '44px',
    [MOBILE_MEDIA_QUERY]: {
      marginBottom: '20px',
    },
  },
  LoginOptionContainer_instructionContainer: {
    color: COLORS.darkBlue,
    fontSize: '18px',
    lineHeight: '20px',
    marginBottom: '18px',
  },
  LoginOptionContainer_loginOptionContainer: {
    padding: '28px 23px',
    marginBottom: '18px',
    borderRadius: '4px',
    transition: '0.2s',
  },
  LoginOptionContainer_signInWithContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
    marginBottom: '10px',
  },
  LoginOptionContainer_signInWithBorder: {
    width: '35%',
    borderBottom: `1px solid ${COLORS.lightBlue2}`,
    borderTop: 'none',
  },
  LoginOptionContainer_signUp: {
    color: COLORS.blue,
    cursor: 'pointer',
    marginBottom: '28px',
    textDecoration: 'underline',
    transition: '0.2s',
    ':hover': {
      color: COLORS.darkBlue,
    },
  },
  LoginOptionContainer_errorContainer: {
    backgroundColor: COLORS.redAlpha25,
    color: COLORS.red,
    marginBottom: '10px',
    padding: '8px',
  },
  // Headers
  LoginOptionContainer_header: {
    color: COLORS.darkBlue,
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: '35px',
    marginBottom: '14px',
    [MOBILE_MEDIA_QUERY]: {
      marginTop: '20px',
    },
  },
  LoginOptionContainer_headerCentered: {
    textAlign: 'center',
  },
  LoginOptionContainer_subHeader: {
    color: COLORS.darkBlue,
  },
  LoginOptionContainer_title: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '38px',
    color: COLORS.darkBlue,
    marginBottom: '8px',
  },
  // Text
  LoginOptionContainer_description: {
    color: COLORS.darkBlue,
    fontSize: '16px',
    lineHeight: '25px',
    marginBottom: '28px',
  },
  LoginOptionContainer_checkboxLabel: {
    fontSize: '12px',
    paddingLeft: '30px',
    paddingRight: '30px',
    [MOBILE_MEDIA_QUERY]: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },
  LoginOptionContainer_externalLink: {
    marginLeft: '15px',
    lineHeight: '0.8',
  },
  LoginOptionContainer_textParagraph: {
    margin: '25px auto 33px',
    color: COLORS.darkGray,
  },
  LoginOptionsContainer_learnMoreLink: {
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  // Terms
  LoginOptionContainer_termsContainer: {
    padding: '20px 0px',
    borderTop: `1px solid ${COLORS.lightBlue2}`,
    position: 'relative',
    width: '100%',
    textAlign: 'center',
  },
  LoginOptionContainer_termsLink: {
    color: COLORS.blue,
    fontSize: '12px',
    transition: '0.2s',
    ':hover': {
      color: COLORS.darkBlue,
    },
  },
  // Email input
  LoginOptionContainer_emailContainer: {
    marginTop: '22px',
    marginBottom: '10px',
  },
  LoginOptionContainer_emailInput: {
    display: 'block',
    width: '100%',
    border: `1px solid ${COLORS.lightBlue2}`,
    borderRadius: '4px',
    marginBottom: '12px',
    padding: '16px',
    transition: '0.2s',
  },
  LoginOptionContainer_emailSubmit: {
    backgroundColor: COLORS.blue,
    border: 'none',
    borderRadius: '4px',
    color: COLORS.white,
    cursor: 'pointer',
    display: 'block',
    fontWeight: 500,
    padding: '16px',
    transition: '0.2s',
    width: '100%',
    ':hover': {
      backgroundColor: COLORS.blueDarkened,
    },
  },
  // Login buttons
  LoginOptionContainer_buttonText: {
    color: COLORS.white,
    fontWeight: 500,
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  LoginOptionContainer_buttonTextSecondary: {
    color: COLORS.darkBlue,
    ':hover': {
      color: COLORS.white,
    },
  },
  LoginOptionContainer_pendingContent: {
    textAlign: 'center',
    color: COLORS.darkBlue,
    fontSize: '20px',
    fontWeight: 500,
    marginTop: '10px',
  },
  LoginOptionContainer_ledgerPending: {
    textAlign: 'center',
    color: COLORS.darkBlue,
    fontSize: '24px',
    fontWeight: 500,
    marginBottom: '40px',
  },
  // Expanders
  LoginOptionContainer_expanderIcon: {
    marginLeft: '10px',
  },
  // Dimmer
  LoginOptionContainer_dimmerContainer: {
    marginTop: '20px',
  },
  LoginOptionContainer_dimmer: {
    position: 'relative',
    width: 'inherit',
    height: 'inherit',
  },
  // Ledger
  LoginOptionContainer_ledgerExpander: {
    color: COLORS.blue,
    marginTop: '20px',
    fontWeight: 500,
    textAlign: 'center',
    cursor: 'pointer',
  },
  LoginOptionContainer_ledgerContainer: {
    color: COLORS.darkGray,
    textAlign: 'center',
    paddingTop: '20px',
  },
  // Brave
  LoginOptionContainer_braveMetaMaskIcons: {
    height: '70px',
    width: '175px',
  },
  LoginOptionContainer_braveMetaMaskIconsContainer: {
    marginTop: '28px',
    textAlign: 'center',
  },
  LoginOptionContainer_learnMoreLink: {
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  LoginOptionContainer_braveWarningContent: {
    padding: '46px 51px',
  },
  LoginOptionContainer_buttonHolder: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  LoginOptionContainer_ledgerChoice: {
    display: 'flex',
    flexFlow: 'column',
    padding: '50px',
  },
  LoginOptionContainer_ledgerIcon: {
    width: '120px',
    marginTop: '-35px',
  },
  LoginOptionContainer_buttonMenu: {
    display: 'flex',
    flexFlow: 'column',
    margin: 'auto',
    textAlign: 'center',
    width: '95%',
  },
  LoginOptionContainer_ledgerChooseHeader: {
    color: COLORS.darkBlue,
    fontSize: '24px',
    fontWeight: 500,
    marginBottom: '10px',
    marginTop: '-10px',
  },
  LoginOptionContainer_accountSelection: {
    border: `1px solid ${COLORS.gray}`,
    borderRadius: '4px',
    padding: '10px 15px',
  },
  LoginOptionContainer_accountRow: {
    marginTop: '5px',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  LoginOptionContainer_accountDetails: {
    display: 'flex',
    marginLeft: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  LoginOptionContainer_greenCheckmark: {
    width: '20px',
    minWidth: '20px',
    height: '20px',
  },
  LoginOptionContainer_emptyCheckmark: {
    width: '20px',
    minWidth: '20px',
    height: '20px',
    borderRadius: '100%',
    border: `1px solid ${COLORS.gray}`,
  },
  LoginOptionContainer_separator: {
    borderColor: COLORS.gray,
    margin: '15px auto',
    borderWidth: '0.5px',
  },
  LoginOptionContainer_accountBalanceText: {
    color: COLORS.darkBlue,
    fontWeight: 500,
  },
  LoginOptionContainer_accountDetailText: {
    color: COLORS.darkBlue,
  },
  LoginOptionContainer_ledgerLoadingAnimation: {
    width: '222px',
    height: '218px',
    alignSelf: 'center',
  },
  LoginOptionContainer_backButtonStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${COLORS.gray}`,
    borderRadius: '50px',
    cursor: 'pointer',
    transition: '0.2s',
    height: '40px',
    width: '40px',
    ':hover': {
      boxShadow: `0 2px 6px ${COLORS.blueAlpha25}`,
      transform: 'scale(1.02)',
    },
  },
  LoginOptionContainer_ledgerHeader: {
    color: COLORS.darkBlue,
    fontSize: '24px',
    lineHeight: '35px',
    fontWeight: 500,
    marginBottom: '28px',
    textAlign: 'center',
    [MOBILE_MEDIA_QUERY]: {
      marginTop: '20px',
    },
  },
  LoginOptionContainer_ledgerInstructions: {
    color: COLORS.darkBlue,
    fontSize: '18px',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: '20px',
    lineHeight: '24px',
  },
  LoginOptionsContainer_braveWarningContent: {
    padding: '46px 51px',
  },
});

interface ILoginOptionContainerProps {
  isExpanded: boolean;
  isLedgerExpanded: boolean;
  isMobile: boolean;
  setLedgerPath: (...args: any[]) => any;
  toggleExpanded: (...args: any[]) => any;
  onClose?: (...args: any[]) => any;
  toggleLedgerExpanded: (...args: any[]) => any;
}

interface ILoginOptionContainerState {
  isShowingError: boolean;
  isSignUp: boolean;
  isSubmitting: boolean;
  operaWalletEnabled: boolean;
  metaMaskEnabled: boolean;
  metaMaskMobileEnabled: boolean;
  imTokenEnabled: boolean;
  isValidEmail: boolean;
  coinbaseWalletEnabled: boolean;
  trustWalletEnabled: boolean;
  metaMaskBraveWarningOpen: boolean;
  ledgerChoiceOpen: boolean;
  firstLedgerPoll: boolean;
  email: string;
  ledgerDefaultAccount: string;
  ledgerLegacyAccount: string;
  ledgerDefaultBalance: string;
  ledgerLegacyBalance: string;
  ledgerPath: string;
  ledgerPollingInterval: any;
  loginOptions: ILoginOptions;
  selectedOption: ILoginOption;
}

interface ILoginOptions {
  METAMASK: ILoginOption;
  METAMASK_MOBILE: ILoginOption;
  COINBASE_WALLET: ILoginOption;
  TRUST_WALLET: ILoginOption;
  IMTOKEN: ILoginOption;
  OPERA: ILoginOption;
  WALLET_LINK: ILoginOption;
  [key: string]: ILoginOption;
}

interface ILoginOption {
  provider: string;
  title: string;
  pendingMessage?: string;
}

/**
 * @title LoginOptionContainer
 * @author Set Labs
 *
 * The LoginOptionContainer is the container that lets the user choose the login wallet option
 */
class LoginOptionContainer extends PureComponent<
  ILoginOptionContainerProps & WithTranslation,
  ILoginOptionContainerState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isShowingError: false,
      isSignUp: false,
      isSubmitting: false,
      operaWalletEnabled: false,
      metaMaskEnabled: false,
      metaMaskMobileEnabled: false,
      imTokenEnabled: false,
      isValidEmail: false,
      coinbaseWalletEnabled: false,
      trustWalletEnabled: false,
      metaMaskBraveWarningOpen: false,
      ledgerChoiceOpen: false,
      ledgerPollingInterval: undefined,
      ledgerDefaultAccount: '',
      ledgerLegacyAccount: '',
      ledgerDefaultBalance: '0',
      ledgerLegacyBalance: '0',
      ledgerPath: 'default',
      email: '',
      loginOptions: this.getLoginOptions(),
      selectedOption: {} as ILoginOption,
      firstLedgerPoll: true,
    };
  }

  public static get defaultProps() {
    return {
      onClose: () => {},
    };
  }

  componentDidMount = () => {
    this.checkEnabledWallets();
    window.addEventListener('load', this.checkEnabledWallets);
  };

  componentWillUnmount = () => {
    const { ledgerPollingInterval } = this.state;

    window.removeEventListener('load', this.checkEnabledWallets);
    if (ledgerPollingInterval) {
      clearInterval(ledgerPollingInterval);
    }
  };

  componentDidUpdate = (
    prevProps: ILoginOptionContainerProps,
    prevState: ILoginOptionContainerState,
  ) => {
    const {
      ledgerChoiceOpen,
      ledgerPollingInterval,
      ledgerDefaultAccount,
      ledgerLegacyAccount,
    } = this.state;

    if (prevProps.isMobile !== this.props.isMobile) {
      this.checkEnabledWallets();
    }

    if (
      prevState.ledgerChoiceOpen !== ledgerChoiceOpen ||
      prevState.ledgerDefaultAccount !== ledgerDefaultAccount ||
      prevState.ledgerLegacyAccount !== ledgerLegacyAccount
    ) {
      if (ledgerChoiceOpen) {
        if (
          (ledgerDefaultAccount.length > 0 || ledgerLegacyAccount.length > 0) &&
          ledgerPollingInterval
        ) {
          // Accounts already found, stop polling
          this.setState({
            ledgerPollingInterval: undefined,
          });
          clearInterval(ledgerPollingInterval);
        } else if (!ledgerPollingInterval) {
          // If no interval yet, start polling
          const interval = setInterval(this.pollForLedgerAccounts, 2000);
          this.setState({ ledgerPollingInterval: interval, firstLedgerPoll: true });
        }
      } else {
        if (ledgerDefaultAccount.length == 0 && ledgerLegacyAccount.length == 0) {
          // Stop the engines if we close without accounts set already
          ledgerEngine.stopInstance(LEDGER_PATHS.DEFAULT_PATH, process.env.ETHEREUM_NETWORK_ID);
          ledgerEngine.stopInstance(LEDGER_PATHS.LEGACY_PATH, process.env.ETHEREUM_NETWORK_ID);
        }
        // If ledgerChoiceOpen is false, clear everything out
        this.setState({
          ledgerPollingInterval: undefined,
          ledgerDefaultAccount: '',
          ledgerLegacyAccount: '',
          ledgerDefaultBalance: '0',
          ledgerLegacyBalance: '0',
        });
        clearInterval(ledgerPollingInterval);
      }
    }
  };

  pollForLedgerAccounts = async () => {
    try {
      const defaultLedgerWeb3 = getLedgerWeb3(LEDGER_PATHS.DEFAULT_PATH);
      const legacyLedgerWeb3 = getLedgerWeb3(LEDGER_PATHS.LEGACY_PATH);

      const ledgerDefaultAccount = await getAccount(defaultLedgerWeb3);
      const ledgerLegacyAccount = await getAccount(legacyLedgerWeb3);
      let ledgerDefaultBalance = await defaultLedgerWeb3.eth.getBalance(ledgerDefaultAccount);
      if (!ledgerDefaultBalance) {
        ledgerDefaultBalance = '0';
      }
      ledgerDefaultBalance = defaultLedgerWeb3.utils.fromWei(ledgerDefaultBalance);

      let ledgerLegacyBalance = await legacyLedgerWeb3.eth.getBalance(ledgerLegacyAccount);
      if (!ledgerLegacyBalance) {
        ledgerLegacyBalance = '0';
      }
      ledgerLegacyBalance = legacyLedgerWeb3.utils.fromWei(ledgerLegacyBalance);
      if (ledgerDefaultAccount.length > 0 || ledgerLegacyAccount.length > 0) {
        this.setState({
          ledgerDefaultAccount,
          ledgerLegacyAccount,
          ledgerDefaultBalance,
          ledgerLegacyBalance,
        });
      }
    } catch (err) {
      // Locked Ledger
      this.setState({
        ledgerDefaultAccount: '',
        ledgerLegacyAccount: '',
        ledgerDefaultBalance: '0',
        ledgerLegacyBalance: '0',
        firstLedgerPoll: false,
      });
    }
  };

  getLoginOptions = () => {
    const { t } = this.props;

    return {
      LEDGER: {
        provider: WEB3_PROVIDERS.LEDGER,
        title: t('login-modal-options.ledger'),
        pendingMessage: t('login-modal-options.ledger-pending'),
      },
      METAMASK: {
        provider: WEB3_PROVIDERS.METAMASK,
        title: window.ethereum
          ? t('login-modal-options.metamask')
          : t('login-modal-options.metamask-download'),
        pendingMessage: t('login-modal-options.metamask-pending'),
      },
      METAMASK_MOBILE: {
        provider: WEB3_PROVIDERS.METAMASK,
        title: t('login-modal-options.metamask-mobile'),
      },
      COINBASE_WALLET: {
        provider: WEB3_PROVIDERS.COINBASE_WALLET,
        title: t('login-modal-options.coinbase-wallet'),
      },
      TRUST_WALLET: {
        provider: WEB3_PROVIDERS.TRUST_WALLET,
        title: t('login-modal-options.trust-wallet'),
      },
      IMTOKEN: {
        provider: WEB3_PROVIDERS.IMTOKEN,
        title: t('login-modal-options.imtoken'),
      },
      OPERA: {
        provider: WEB3_PROVIDERS.OPERA,
        title: t('login-modal-options.opera-wallet'),
        pendingMessage: t('login-modal-options.opera-wallet-pending'),
      },
      WALLET_LINK: {
        provider: WEB3_PROVIDERS.INFURA,
        title: t('login-modal-options.wallet-link'),
      },
      WALLET_CONNECT: {
        provider: WEB3_PROVIDERS.WALLET_CONNECT,
        title: 'WalletConnect',
      },
    };
  };

  checkEnabledWallets = () => {
    const { isMobile } = this.props;

    const metaMaskEnabled = window.ethereum && !!(window.ethereum as any).isMetaMask;
    const metaMaskMobileEnabled = metaMaskEnabled && isMobile;
    const imTokenEnabled =
      !!window.imToken || (window.ethereum && !!(window.ethereum as any).isImToken);
    const coinbaseWalletEnabled =
      window.web3 &&
      window.web3.currentProvider &&
      (!!window.web3.currentProvider.isToshi || !!window.web3.currentProvider.isCipher);
    const trustWalletEnabled =
      window.web3 && window.web3.currentProvider && !!window.web3.currentProvider.isTrust;
    const operaWalletEnabled = detectOperaWallet();

    this.setState({
      metaMaskEnabled,
      metaMaskMobileEnabled,
      imTokenEnabled,
      coinbaseWalletEnabled,
      trustWalletEnabled,
      operaWalletEnabled,
    });
  };

  // Gets Coinbase Wallet app link, called only when user is on mobile
  getCoinbaseDeepLink = () => {
    const isIOS = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
    if (isIOS) {
      return 'https://itunes.apple.com/app/coinbase-wallet/id1278383455?ls=1&mt=8';
    }
    return 'https://play.google.com/store/apps/details?id=org.toshi';
  };

  /**
   * Handles submitting the user's login option.
   */
  public handleSubmit = async (providerType: string) => {
    const { onClose } = this.props;
    const { ledgerChoiceOpen, loginOptions, metaMaskBraveWarningOpen } = this.state;
    const isBrowserBrave = await isBrave();
    const chosenLoginOption = loginOptions[providerType];

    // Special case for MetaMask as warning
    if (providerType === WEB3_PROVIDERS.METAMASK && isBrowserBrave && !metaMaskBraveWarningOpen) {
      this.setState({ metaMaskBraveWarningOpen: true });
      return;
    }

    // Show Ledger interstitial
    if (chosenLoginOption.provider === WEB3_PROVIDERS.LEDGER && !ledgerChoiceOpen) {
      this.setState({ ledgerChoiceOpen: true });
      return;
    }

    this.setState({
      metaMaskBraveWarningOpen: false,
      ledgerChoiceOpen: false,
      isSubmitting: true,
      selectedOption: chosenLoginOption,
    });

    const success = await getWeb3(chosenLoginOption.provider);

    this.setState({
      isSubmitting: false,
      selectedOption: {} as ILoginOption,
    });
    if (success.loggedIn) {
      onClose();
    } else {
      this.showErrorMessage(chosenLoginOption.provider);
    }
  };

  public showErrorMessage = (provider: string) => {
    const { t } = this.props;

    switch (provider) {
      case WEB3_PROVIDERS.LEDGER:
        toast.warn(t('errors.unlock-ledger'));
        break;
    }
  };

  public renderLedgerLandingPage = () => {
    const { setLedgerPath, t } = this.props;

    const {
      ledgerDefaultAccount,
      ledgerLegacyAccount,
      ledgerLegacyBalance,
      ledgerDefaultBalance,
      ledgerPath,
      firstLedgerPoll,
    } = this.state;

    const buttonStyle = {
      container: {
        border: `1px solid ${COLORS.blue}`,
        width: '100%',
        padding: '20px 22px',
        backgroundColor: COLORS.blue,
        borderRadius: '4px',
        color: COLORS.white,
        ':hover': {
          color: COLORS.white,
          backgroundColor: COLORS.blueDarkened,
        },
      },
      text: {
        color: COLORS.white,
      },
    };

    const accountPresent = ledgerLegacyAccount.length > 0 || ledgerDefaultAccount.length > 0;
    return (
      <Container className={css(styles.LoginOptionContainer_ledgerChoice)}>
        <div
          onClick={() => {
            this.setState({ ledgerChoiceOpen: false });
          }}
          className={css(styles.LoginOptionContainer_backButtonStyle)}
        >
          <div className={css(styles.LoginOptionContainer_buttonText)}>
            <img src={leftArrowDark} alt="back button" />
          </div>
        </div>
        <div className={css(styles.LoginOptionContainer_ledgerHeader)}>
          <img
            className={css(styles.LoginOptionContainer_ledgerIcon)}
            src={LEDGER_WALLET_LOGO}
            alt="ledger logo"
          />
        </div>
        <CSSTransition
          in={accountPresent}
          timeout={300}
          exit={false}
          classNames="fade"
          unmountOnExit
        >
          <div>
            <Header as="h4" className={css(styles.LoginOptionContainer_ledgerChooseHeader)}>
              {t('login-modal.ledger-choose-your-address')}
            </Header>
            <div className={css(styles.LoginOptionContainer_accountSelection)}>
              {ledgerDefaultAccount.length > 0 && (
                <div
                  className={css(styles.LoginOptionContainer_accountRow)}
                  onClick={() => this.setState({ ledgerPath: 'default' })}
                >
                  {ledgerPath === 'default' ? (
                    <img
                      className={css(styles.LoginOptionContainer_greenCheckmark)}
                      src={greenCheckmark}
                      alt="green checkmark"
                    />
                  ) : (
                    <div className={css(styles.LoginOptionContainer_emptyCheckmark)}>&nbsp;</div>
                  )}
                  <div className={css(styles.LoginOptionContainer_accountDetails)}>
                    <div className={css(styles.LoginOptionContainer_accountDetailText)}>
                      {truncateEthAddress(ledgerDefaultAccount)}
                    </div>
                    <div className={css(styles.LoginOptionContainer_accountBalanceText)}>
                      {ledgerDefaultBalance}
                      <span className={css(styles.LoginOptionContainer_accountDetailText)}>
                        {' '}
                        ETH
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {ledgerLegacyAccount.length > 0 && ledgerDefaultAccount.length > 0 && (
                <hr className={css(styles.LoginOptionContainer_separator)} />
              )}
              {ledgerLegacyAccount.length > 0 && (
                <div
                  className={css(styles.LoginOptionContainer_accountRow)}
                  onClick={() => this.setState({ ledgerPath: 'legacy' })}
                >
                  {ledgerPath === 'legacy' ? (
                    <img
                      className={css(styles.LoginOptionContainer_greenCheckmark)}
                      src={greenCheckmark}
                      alt="green checkmark"
                    />
                  ) : (
                    <div className={css(styles.LoginOptionContainer_emptyCheckmark)}>&nbsp;</div>
                  )}
                  <div className={css(styles.LoginOptionContainer_accountDetails)}>
                    <div className={css(styles.LoginOptionContainer_accountDetailText)}>
                      {truncateEthAddress(ledgerLegacyAccount)}
                    </div>
                    <div className={css(styles.LoginOptionContainer_accountBalanceText)}>
                      {ledgerLegacyBalance}
                      <span className={css(styles.LoginOptionContainer_accountDetailText)}>
                        {' '}
                        ETH
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <br />
            <br />
            <Button
              onClick={async () => {
                setLedgerPath(
                  ledgerPath === 'default' ? LEDGER_PATHS.DEFAULT_PATH : LEDGER_PATHS.LEGACY_PATH,
                );
                await this.handleSubmit(WEB3_PROVIDERS.LEDGER);
              }}
              style={buttonStyle}
            >
              <div className={css(styles.LoginOptionContainer_buttonText)}>
                {t('buttons.continue')}
              </div>
            </Button>
          </div>
        </CSSTransition>
        <CSSTransition
          in={!accountPresent}
          timeout={300}
          exit={false}
          classNames="fade"
          unmountOnExit
        >
          <div className={css(styles.LoginOptionContainer_buttonMenu)}>
            <div className={css(styles.LoginOptionContainer_ledgerPending)}>
              {firstLedgerPoll
                ? t('login-modal.ledger-initial-load')
                : t('login-modal.ledger-please-unlock')}
              {!firstLedgerPoll && (
                <div className={css(styles.LoginOptionContainer_ledgerInstructions)}>
                  1. {t('login-modal.ledger-step-one')}
                  <br />
                  2. {t('login-modal.ledger-step-two')}
                </div>
              )}
            </div>
            <img
              className={css(styles.LoginOptionContainer_ledgerLoadingAnimation)}
              src={LEDGER_LOADING_ANIMATION}
              alt="ledger image"
            />
          </div>
        </CSSTransition>
      </Container>
    );
  };

  /**
   * Renders a warning that tells the user to disable Brave's wallet in order to use Metamask.
   */
  public renderMetaMaskBraveWarning = () => {
    const { t } = this.props;
    const backStyle = {
      container: {
        border: `1px solid ${COLORS.darkBlue}`,
        color: COLORS.darkBlue,
        width: '46%',
        padding: '16px 18px',
        backgroundColor: COLORS.white,
        borderRadius: '4px',
        ':hover': {
          backgroundColor: COLORS.white,
        },
      },
      text: {
        color: COLORS.darkBlue,
      },
    };

    const continueStyle = {
      container: {
        border: `1px solid ${COLORS.blue}`,
        width: '46%',
        padding: '16px 18px',
        backgroundColor: COLORS.blue,
        borderRadius: '4px',
        color: COLORS.white,
        ':hover': {
          backgroundColor: COLORS.darkBlue,
        },
      },
      text: {
        color: COLORS.white,
        fontWeight: 500,
        fontSize: '18px',
      },
    };

    return (
      <Modal.Content className={css(styles.LoginOptionContainer_braveWarningContent)}>
        <Container>
          <Header
            as="h4"
            className={css(
              styles.LoginOptionContainer_header,
              styles.LoginOptionContainer_headerCentered,
            )}
          >
            {t('login-modal.brave-metamask-warning.title')}
          </Header>
          <div className={css(styles.LoginOptionContainer_braveMetaMaskIconsContainer)}>
            <img
              className={css(styles.LoginOptionContainer_braveMetaMaskIcons)}
              src={braveMetaMaskIcons}
              alt="brave-metamask"
            />
          </div>
          <div
            className={css(styles.LoginOptionContainer_textParagraph)}
            dangerouslySetInnerHTML={{
              __html: t('login-modal.brave-metamask-warning.description'),
            }}
          />

          <div className={css(styles.LoginOptionContainer_buttonHolder)}>
            <Button
              onClick={() => {
                this.setState({ metaMaskBraveWarningOpen: false });
              }}
              style={backStyle}
              text="Back"
            ></Button>
            <Button
              onClick={() => {
                this.handleSubmit(WEB3_PROVIDERS.METAMASK);
              }}
              style={continueStyle}
              text="Continue"
            ></Button>
          </div>
        </Container>
      </Modal.Content>
    );
  };

  toggleSignInOrSignUp = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  loginWithMetamask = () => {
    this.handleSubmit(WEB3_PROVIDERS.METAMASK);
  };

  loginWithWalletLink = () => {
    this.handleSubmit(WEB3_PROVIDERS.WALLET_LINK);
  };

  loginWithOpera = () => {
    this.handleSubmit(WEB3_PROVIDERS.OPERA);
  };

  loginWithLedger = () => {
    this.handleSubmit(WEB3_PROVIDERS.LEDGER);
  };

  loginWithWalletConnect = () => {
    this.handleSubmit(WEB3_PROVIDERS.WALLET_CONNECT);
  };

  showLoginError = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    this.setState({ isShowingError: true });
  };

  public render() {
    const { isMobile, isLedgerExpanded, toggleLedgerExpanded, t } = this.props;
    const {
      metaMaskEnabled,
      metaMaskMobileEnabled,
      operaWalletEnabled,
      isSubmitting,
      selectedOption,
      metaMaskBraveWarningOpen,
      ledgerChoiceOpen,
    } = this.state;

    if (metaMaskBraveWarningOpen) {
      return this.renderMetaMaskBraveWarning();
    }

    if (ledgerChoiceOpen) {
      return this.renderLedgerLandingPage();
    }

    return (
      <>
        {isSubmitting ? (
          <Modal.Content className={css(styles.LoginOptionContainer_content)}>
            <div className={css(styles.LoginOptionContainer_dimmerContainer)}>
              <Dimmer active inverted className={css(styles.LoginOptionContainer_dimmer)}>
                <Loader active inline="centered" inverted />
              </Dimmer>
            </div>
            <div className={css(styles.LoginOptionContainer_pendingContent)}>
              {selectedOption.pendingMessage}
            </div>
            {selectedOption.provider === WEB3_PROVIDERS.METAMASK && (
              <>
                <div
                  className={css(styles.LoginOptionContainer_ledgerExpander)}
                  onClick={toggleLedgerExpanded}
                >
                  {!isLedgerExpanded ? (
                    <div>
                      {t('login-modal.ledger-warning.title')}{' '}
                      <Icon
                        className={css(styles.LoginOptionContainer_expanderIcon)}
                        name="chevron down"
                      />
                    </div>
                  ) : (
                    <div>
                      {t('login-modal.ledger-warning.title')}{' '}
                      <Icon
                        className={css(styles.LoginOptionContainer_expanderIcon)}
                        name="chevron up"
                      />
                    </div>
                  )}
                </div>
                {isLedgerExpanded && (
                  <div className={css(styles.LoginOptionContainer_ledgerContainer)}>
                    {t('login-modal.ledger-warning.description')}
                  </div>
                )}
              </>
            )}
          </Modal.Content>
        ) : (
          <>
            <Modal.Content className={css(styles.LoginOptionContainer_content)}>
              <Header as="h4" className={css(styles.LoginOptionContainer_header)}>
                {t('login-modal.sign-in')}
              </Header>
              <LoginOptions
                isMobile={isMobile}
                metaMaskEnabled={metaMaskEnabled}
                metaMaskMobileEnabled={metaMaskMobileEnabled}
                operaWalletEnabled={operaWalletEnabled}
                loginWithWalletLink={this.loginWithWalletLink}
                loginWithLedger={this.loginWithLedger}
                loginWithMetamask={this.loginWithMetamask}
                loginWithOpera={this.loginWithOpera}
                loginWithWalletConnect={this.loginWithWalletConnect}
              />
            </Modal.Content>
          </>
        )}
      </>
    );
  }
}

export default withTranslation('login-modal')(LoginOptionContainer);
