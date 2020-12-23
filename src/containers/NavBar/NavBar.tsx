import { StyleSheet, css } from 'aphrodite';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { slide as MobileMenu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { Menu, Container, Popup, Grid } from 'semantic-ui-react';

import chevronDown from '@img/icons/down-chevron-dark-blue.svg';
import accountIcon from '@img/icons/account-icon-gray.svg';

import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';
import {
  logOut as logOutAction,
  handleLogin as handleLoginAction,
} from '@actions/web3Actions';
import { IMenuItem, IWindowDimensions } from '@typings/index';
import { withTranslation, WithTranslation } from 'react-i18next';
import {
  truncateEthAddress,
} from '@utils/index';

const { TABLET_LANDSCAPE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  NavBar_accountStatusButtonContainer: {
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      paddingTop: '20px',
    },
  },
  NavBar_mobilePlaceholder: {
    height: '52px',
  },
  NavBar_stickyContainer: {
    backgroundColor: COLORS.white,
    borderBottom: `1px solid ${COLORS.lightBlue2}`,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  NavBar_outerContainer: {
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      backgroundColor: COLORS.white,
      width: '100%',
      height: '52px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999,
      paddingBottom: '0',
    },
  },
  NavBar_container: {
    minHeight: '75px',
    background: COLORS.white,
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      minHeight: '0',
      paddingTop: '0',
      paddingBottom: '0',
    },
  },
  NavBar_containerHomeFeed: {
    width: '90%',
  },
  NavBar_logoMenuItem: {
    padding: '0',
    paddingLeft: '0',
    display: 'flex',
    color: COLORS.darkBlue,
    fontSize: '14px',
    height: '50px',
    WebkitTransition: 'width .35s, height .35s, background-color .35s, -webkit-transform .35s',
    transition: 'width .35s, height .35s, background-color .35s, transform .35s',
  },
  NavBar_logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavBar_logo: {
    margin: '0 auto',
    paddingRight: '15px',
    height: '46px',
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      position: 'relative',
      top: '2px',
    },
  },
  NavBar_mobileLogo: {
    margin: '0 auto',
    height: '32px',
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  NavBar_mobileAccountSignIn: {
    position: 'absolute',
    right: '10px',
    top: '16px',
  },
  NavBar_accountIcon: {
    width: '24px',
    height: '24px',
  },
  NavBar_logoWithText: {
    margin: '0 auto',
    paddingRight: '15px',
    height: '46px',
    width: 'auto',
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      paddingRight: '0',
    },
  },
  NavBar_noHover: {
    ':hover': {
      background: 'transparent',
    },
  },
  NavBar_menu: {
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    WebkitBoxShadow: 'none',
    minHeight: '80px',
    MozBoxShadow: 'none',
    boxShadow: 'none',
    border: 'none',
    height: '75px',
    marginRight: '0',
    marginLeft: '0',
    marginBottom: '0',
    paddingTop: '6px',
    paddingBottom: '6px',
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      height: '52px',
      minHeight: '0',
      paddingTop: '0px',
      paddingBottom: '0px',
      position: 'relative',
      zIndex: 10000,
    },
  },
  NavBar_menuItem: {
    paddingBottom: '5px',
    paddingTop: '5px',
  },
  NavBar_menuItemText: {
    fontWeight: 400,
    color: COLORS.darkBlue,
    transition: '0.2s',
    cursor: 'pointer',
    ':hover': {
      color: COLORS.blue,
    },
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      fontWeight: 500,
      fontSize: '24px',
      marginTop: '24px',
      marginBottom: '24px',
    },
  },
  navBar_resourcePopup: {
    maxWidth: '160px',
  },
  NavBar_menuItemBorder: {
    borderTop: `1px solid ${COLORS.lightGray}`,
  },
  NavBar_innerMenuItem: {
    display: 'flex',
    alignItems: 'center',
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      display: 'flex',
      alignItems: 'center',
      padding: '2px 30px',
      transition: '0.2s',
    },
  },
  NavBar_activeMenuItem: {
    color: COLORS.darkBlue,
    fontWeight: 500,
  },
  NavBar_navIcon: {
    colors: COLORS.darkGray,
    marginRight: '10px',
    height: '16px',
    width: 'auto',
  },
  NavBar_notificationIcon: {
    position: 'relative',
    top: '-8px',
    right: '-4px',
    backgroundColor: COLORS.red,
    borderRadius: '50%',
    height: '8px',
    width: '8px',
  },
  NavBar_mobileMenuLogo: {
    paddingBottom: '25px',
    width: '160px',
  },
  NavBar_mobileMenuItemText: {
    marginLeft: '-30px',
    lineHeight: '30px',
    ':hover': {
      color: COLORS.darkBlue,
    },
  },
  NavBar_mobileMenuSmallItemText: {
    color: COLORS.darkBlue,
    marginTop: '6px',
    marginBottom: '6px',
    marginLeft: '-30px',
    lineHeight: '24px',
    fontSize: '16px',
    fontWeight: 300,
  },
  NavBar_mobileMenuLastSmallItem: {
    marginBottom: '24px',
  },
  NavBar_mobileMenuDropdown: {
    justifyContent: 'space-between',
  },
  NavBar_mobileMenuDropdownContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
    transition: 'max-height 0.2s',
    maxHeight: '500px',
  },
  NavBar_mobileMenuDropdownContentHidden: {
    maxHeight: '0px',
  },
  NavBar_dropdownRow: {
    display: 'table',
    height: '20px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: COLORS.lightGray,
    },
  },
  NavBar_iconColumn: {
    width: '6.25%',
    paddingRight: '15px',
    verticalAlign: 'middle',
    display: 'table-cell',
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      marginRight: '15px',
      marginTop: '15px',
      marginBottom: '10px',
    },
  },
  NavBar_separator: {
    width: '100%',
    borderTop: `1px solid ${COLORS.gray}`,
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      borderTop: 'none',
    },
  },
  // Dropdown
  NavBar_chevronDown: {
    width: '10px',
    marginLeft: '5px',
    pointerEvents: 'none',
    [TABLET_LANDSCAPE_MEDIA_QUERY]: {
      marginLeft: '0',
      marginRight: '5px',
    },
  },
  NavBar_mobileChevron: {
    width: '15px',
    marginLeft: '5px',
    pointerEvents: 'none',
    transition: '0.2s',
  },
  NavBar_mobileChevronUp: {
    transform: 'rotate(180deg)',
  },
  NavBar_dropDownText: {
    color: COLORS.darkBlue,
  },
  // Sign In
  NavBar_menuItemSignIn: {
    border: `1px solid ${COLORS.darkBlue}`,
    borderRadius: '4px',
    height: '40px',
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.2s',
    ':hover': {
      backgroundColor: COLORS.darkBlue,
      border: `1px solid ${COLORS.darkBlue}`,
      boxShadow: '0 6px 12px 0 rgba(35, 1, 221, 0.25)',
    },
    ':hover .sign-in': {
      color: COLORS.white,
    },
  },
  NavBar_setPopup: {
    zIndex: 15000,
    overflow: 'hidden',
  },
  // Sign Up
  NavBar_signUpButton: {
    background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.lightBlue3})`,
    borderRadius: '50px',
    justifyContent: 'center',
    marginTop: '60px',
  },
  NavBar_signUpButtonText: {
    color: COLORS.white,
  },
  // Accordion
  NavBar_accordionTitle: {
    display: 'flex',
    alignItems: 'center',
  },
});

const mobileMenuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '24px',
    height: '18px',
    left: '20px',
    top: '20px',
  },
  bmBurgerBars: {
    background: COLORS.darkBlue,
    borderRadius: '2px',
    height: '2px',
  },
  bmBurgerBarsHover: {
    background: 'transparent',
  },
  bmCrossButton: {
    display: 'none',
    top: '15px',
    right: '15px',
  },
  bmCross: {
    background: COLORS.darkBlue,
    width: '8px',
    height: '25px',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    width: '75%',
    top: '0',
    left: '0',
  },
  bmMenu: {
    background: COLORS.white,
    padding: '1em 1em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: COLORS.lightGray,
  },
  bmItemList: {
    color: COLORS.white,
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: '0',
    left: '0',
  },
};

export interface INavBarProps {
  isLoggedIn: boolean;
  isSocialTrader: boolean;
  account: string;
  username: string;
  activeItem: string;
  history: any;
  windowDimension: IWindowDimensions;
  handleLogin: (...args: any[]) => any;
  logOut: (...args: any[]) => any;
}

interface INavBarState {
  hamburgerOpen: boolean;
  accountDropdownOpen: boolean;
  activeIndex: number;
}

class NavBar extends PureComponent<INavBarProps & WithTranslation, INavBarState> {
  static get defaultProps() {
    return {
      windowDimension: {
        isTabletLandscape: false,
        isMobile: false,
      } as IWindowDimensions,
      activeItem: '/',
    };
  }

  constructor(props: INavBarProps & WithTranslation) {
    super(props);
    this.state = {
      hamburgerOpen: false,
      accountDropdownOpen: false,
      activeIndex: 0,
    };
  }

  handleMenuItemClick = () => {
    this.setState({
      hamburgerOpen: false,
      accountDropdownOpen: false,
    });
  };

  handleHamburgerClick = (state: any) => {
    const { isOpen } = state;
    this.setState({ hamburgerOpen: isOpen });
  };

  renderMenuLink({ name, path, svg, svgInactive }: IMenuItem) {
    if (!name) return;
    const { activeItem } = this.props;
    const isActive = activeItem === path;
    const activeStyle = isActive ? styles.NavBar_activeMenuItem : null;

    return (
      <Menu.Item
        as={Link}
        name={name}
        to={path}
        onClick={() => this.handleMenuItemClick()}
        className={css(styles.NavBar_noHover, styles.NavBar_menuItem)}
        key={name}
      >
        <div className={css(styles.NavBar_innerMenuItem)}>
          {svg ? (
            <img
              alt={name}
              className={css(styles.NavBar_navIcon)}
              src={isActive ? svg : svgInactive}
            />
          ) : null}
          <span className={css(activeStyle, styles.NavBar_menuItemText)}>{name}</span>
        </div>
      </Menu.Item>
    );
  }

  renderAccountDropdown = () => {
    const { activeItem, account, logOut, t } = this.props;
    const { accountDropdownOpen } = this.state;
    const isActive = activeItem === '/account';
    const activeStyle = isActive ? styles.NavBar_activeMenuItem : undefined;

    const trigger = (
      <Menu.Item
        className={css(styles.NavBar_noHover, styles.NavBar_menuItem)}
        onClick={() => {
          this.setState({ accountDropdownOpen: false });
        }}
      >
        <div className={css(styles.NavBar_innerMenuItem, styles.NavBar_menuItemText)}>
          <img src={accountIcon} alt="Account icon" className={css(styles.NavBar_navIcon)} />
          {truncateEthAddress(account)}
          <img src={chevronDown} alt="Chevron down" className={css(styles.NavBar_chevronDown)} />
        </div>
      </Menu.Item>
    );

    return (
      <Popup
        trigger={trigger}
        on="hover"
        basic
        className={`${css(styles.NavBar_setPopup)} transition-fadein`}
        hideOnScroll
        hoverable
        open={accountDropdownOpen}
        onOpen={() => {
          this.setState({
            accountDropdownOpen: true,
            hamburgerOpen: false,
          });
        }}
        onClose={() => this.setState({ accountDropdownOpen: false })}
        content={
          <div
            onMouseEnter={() => this.setState({ accountDropdownOpen: true })}
            onMouseLeave={() => this.setState({ accountDropdownOpen: false })}
          >
            <Grid>
              {/* Sign Out */}
              <Grid.Row className={css(styles.NavBar_dropdownRow)}>
                <Grid.Column
                  className={css(styles.NavBar_iconColumn, activeStyle)}
                  onClick={() => {
                    this.handleMenuItemClick();
                    logOut();
                  }}
                >
                  <span className={css(styles.NavBar_dropDownText)}>{t('account.sign-out')}</span>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        }
      />
    );
  };

  renderSignUp = () => {
    const { history, t } = this.props;
    return (
      <Menu.Item>
        <div
          className={css(styles.NavBar_menuItemSignIn)}
          onClick={() => {
            this.handleMenuItemClick();
            history.push('/signup');
          }}
        >
          <span
            className={`${css(styles.NavBar_menuItemText, styles.NavBar_innerMenuItem)} sign-in`}
          >
            {t('sign-up')}
          </span>
        </div>
      </Menu.Item>
    );
  };

  renderSignIn = () => {
    const { handleLogin, t } = this.props;

    return (
      <React.Fragment>
        <Menu.Item className={css(styles.NavBar_noHover, styles.NavBar_menuItem)}>
          <div
            className={css(styles.NavBar_menuItemSignIn)}
            onClick={() => {
              this.handleMenuItemClick();
              handleLogin();
            }}
          >
            <span
              className={`${css(styles.NavBar_menuItemText, styles.NavBar_innerMenuItem)} sign-in`}
            >
              {t('sign-in')}
            </span>
          </div>
        </Menu.Item>
      </React.Fragment>
    );
  };

  renderMobileMenu = () => {
    const {
      account,
      logOut,
      handleLogin,
      t,
    } = this.props;
    const {
      hamburgerOpen,
    } = this.state;

    return (
      <React.Fragment>
        <MobileMenu
          isOpen={hamburgerOpen}
          styles={mobileMenuStyles}
          onStateChange={this.handleHamburgerClick}
        >
          <div
            className={css(styles.NavBar_innerMenuItem, styles.NavBar_menuItemBorder)}
            onClick={() => {
              if (account) {
                this.handleMenuItemClick();
                logOut();
              } else {
                this.handleMenuItemClick();
                handleLogin();
              }
            }}
          >
            <span className={css(styles.NavBar_menuItemText)} style={{ marginLeft: '-30px' }}>
              {account ? t('account.sign-out') : t('sign-in')}
            </span>
          </div>
        </MobileMenu>
      </React.Fragment>
    );
  };

  render() {
    const { activeItem, windowDimension, isLoggedIn } = this.props;
    const { isTabletLandscape } = windowDimension;

    const isOnHomePageFeed = activeItem === '/' && isLoggedIn;
    let stickyClass, widerWidthClass;

    if (isOnHomePageFeed) {
      stickyClass = styles.NavBar_stickyContainer;
      widerWidthClass = styles.NavBar_containerHomeFeed;
    }

    return (
      <React.Fragment>
        {isTabletLandscape ? <div className={css(styles.NavBar_mobilePlaceholder)} /> : null}
        <div className={css(styles.NavBar_outerContainer, stickyClass)}>
          <Container
            className={css(styles.NavBar_container, widerWidthClass)}
            id="NavBarHomeFeed_container"
          >
            <Menu borderless className={css(styles.NavBar_menu)}>
              {isTabletLandscape ? (
                this.renderMobileMenu()
              ) : (
                <Menu.Menu position="right">
                  {isLoggedIn ? this.renderAccountDropdown() : this.renderSignIn()}
                </Menu.Menu>
              )}
            </Menu>
          </Container>
          {activeItem.includes('/set/') ? <div className={css(styles.NavBar_separator)} /> : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    windowDimension: state.windowDimension,
    account: state.web3.account,
    username: state.web3.username,
    isLoggedIn: state.web3.isLoggedIn,
    isSocialTrader: state.web3.isSocialTrader,
  };
};

const mapDispatchToProps = {
  handleLogin: handleLoginAction,
  logOut: logOutAction,
};

const translated = withTranslation('navbar')(NavBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translated);
