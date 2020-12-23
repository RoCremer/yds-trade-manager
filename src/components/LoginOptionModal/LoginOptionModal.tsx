import { css, StyleSheet } from 'aphrodite';
import React, { PureComponent } from 'react';
import { Modal } from 'semantic-ui-react';

import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';
import { CloseIcon, LoginOptionContainer } from '@components/index';

const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  LoginOptionModal_container: {
    marginBottom: '100px',
    borderRadius: '5px',
    backgroundColor: COLORS.white,
    transition: '0.2s',
    [MOBILE_MEDIA_QUERY]: {
      height: '100%',
      margin: '0',
      width: '100%',
      overflowY: 'auto',
    },
  },
});

interface ILoginOptionModalProps {
  isModalOpen: boolean;
  isMobile: boolean;
  isTabletLandscape: boolean;
  onClose: (...args: any[]) => any;
  setLedgerPath: (...args: any[]) => any;
}

interface ILoginOptionModalState {
  isExpanded: boolean;
  isLedgerExpanded: boolean;
}

/**
 * @title LoginOptionModal
 * @author Set Labs
 *
 * The LoginOptionModal is the modal that lets the user choose the login wallet option
 */
class LoginOptionModal extends PureComponent<ILoginOptionModalProps, ILoginOptionModalState> {
  constructor(props: ILoginOptionModalProps) {
    super(props);

    this.state = {
      isExpanded: false,
      isLedgerExpanded: false,
    };
  }

  public render() {
    const { isModalOpen, isTabletLandscape, isMobile, onClose, setLedgerPath } = this.props;
    const { isExpanded, isLedgerExpanded } = this.state;

    return (
      <Modal
        closeIcon={isTabletLandscape ? <CloseIcon onClick={onClose} /> : false}
        open={isModalOpen}
        onClose={() => {
          this.setState({ isExpanded: false, isLedgerExpanded: false });
          onClose();
        }}
        size="tiny"
        className={`${css(styles.LoginOptionModal_container)} scrolling`}
      >
        <LoginOptionContainer
          setLedgerPath={setLedgerPath}
          isExpanded={isExpanded}
          isLedgerExpanded={isLedgerExpanded}
          toggleExpanded={() =>
            this.setState(prevState => {
              return { isExpanded: !prevState.isExpanded };
            })
          }
          toggleLedgerExpanded={() =>
            this.setState(prevState => {
              return { isLedgerExpanded: !prevState.isLedgerExpanded };
            })
          }
          isMobile={isMobile}
          onClose={onClose}
        />
      </Modal>
    );
  }
}

export default (LoginOptionModal as any) as React.SFC<ILoginOptionModalProps>;
