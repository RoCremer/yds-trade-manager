import { StyleSheet, css } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  closeLoginModal as closeLoginModalAction,
  logOut as logOutAction,
  setLedgerPath as setLedgerPathAction,
} from '@actions/web3Actions';
import { CloseIcon, LoginOptionModal } from '@components/index';
import { COLORS } from '@constants/index';
import { IWindowDimensions } from '@typings/index';

const styles = StyleSheet.create({
  Modals_toastProgressBar: {
    background: COLORS.blue,
  },
  Modals_toastBody: {
    fontFamily: 'Graphik, Arial, sans-serif',
    fontSize: '16px',
    color: COLORS.darkBlue,
    marginRight: '10px',
  },
  Modals_innerToast: {
    padding: '15px',
    paddingBottom: '20px',
    borderRadius: '4px',
  },
  Modals_toast: {
    zIndex: 1000000,
  },
  Modals_toastCloseButton: {
    position: 'initial',
  },
});

interface IToastCloseIconProps {
  closeToast?: (...args: any[]) => any;
}

const ToastCloseIcon = ({ closeToast }: IToastCloseIconProps) => (
  <CloseIcon customStyles={styles.Modals_toastCloseButton} onClick={closeToast} />
);

export interface IModalsProps {
  isLoginModalOpen: boolean;
  windowDimension: IWindowDimensions;
  closeLoginModal: (...args: any[]) => any;
  logOut: (...args: any[]) => any;
  setLedgerPath: (...args: any[]) => any;
}

class Modals extends Component<IModalsProps> {
  render() {
    const {
      closeLoginModal,
      isLoginModalOpen,
      windowDimension: { isTabletLandscape, isMobile },
      setLedgerPath,
    } = this.props;

    return (
      <Fragment>
        <LoginOptionModal
          setLedgerPath={setLedgerPath}
          isModalOpen={isLoginModalOpen}
          isMobile={isMobile}
          isTabletLandscape={isTabletLandscape}
          onClose={closeLoginModal}
        />
        <ToastContainer
          className={css(styles.Modals_toast)}
          closeButton={<ToastCloseIcon />}
          toastClassName={css(styles.Modals_innerToast)}
          bodyClassName={css(styles.Modals_toastBody)}
          progressClassName={css(styles.Modals_toastProgressBar)}
          transition={Slide}
          position="bottom-left"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  windowDimension: state.windowDimension,
  isLoginModalOpen: state.web3.isLoginModalOpen,
});

const mapDispatchToProps = {
  closeLoginModal: closeLoginModalAction,
  logOut: logOutAction,
  setLedgerPath: setLedgerPathAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((Modals as any) as React.SFC<IModalsProps>);
