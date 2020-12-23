import { css, StyleSheet } from 'aphrodite';
import React, { PureComponent } from 'react';
import { Modal } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';

import CloseIcon from '@components/CloseIcon';
import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';
import { IToken } from '@typings/index';

const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  SelectCoinModal_container: {
    width: '400px',
    transition: '0.2s',
    textAlign: 'left',
    backgroundColor: COLORS.white,
    borderRadius: '8px',
    padding: '0px',
    [MOBILE_MEDIA_QUERY]: {
      width: '90%',
      padding: '12px',
      top: '20px',
    },
  },
  SelectCoinModal_modalContent: {
    padding: '0px',
    borderRadius: '4px',
  },
  SelectCoinModal_bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'centeer-around',
    alignItems: 'center',
    padding: '20px',
  },
  SelectCoinModal_closeButton: {
    margin: '10px',
  },
  SelectCoinModal_titleText: {
    marginBottom: '18px',
    color: COLORS.darkBlue,
    fontWeight: 500,
  },
  SelectCoinModal_titleContainer: {
    padding: '20px 30px',
    borderBottom: `1px solid ${COLORS.lightBlue2}`,
  },
  SelectCoinModal_tokenContainer: {
    height: '400px',
    paddingBottom: '20px',
    overflowY: 'scroll',
  },
  SelectCoinModal_tokenRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: COLORS.lightGray,
    },
  },
  SelectCoinModal_tokenLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
  },
  SelectCoinModal_tokenImage: {
    width: '30px',
    height: '30px',
    marginRight: '15px',
  },
  SelectCoinModal_tokenSymbol: {
    color: COLORS.darkBlue,
    fontWeight: 500,
  },
  SelectCoinModal_tokenQuantity: {
    color: COLORS.darkBlue,
    fontWeight: 500,
    textAlign: 'right',
  },
});

interface ISelectCoinModalProps {
  isModalOpen: boolean;
  enabledTokens: IToken[];
  onSelectToken: (...args: any[]) => any;
  onClose: (...args: any[]) => any;
}

/**
 * @title SelectCoinModal
 * @author Set Labs
 *
 * Allows for selection of a token from dropdown list
 */
class SelectCoinModal extends PureComponent<ISelectCoinModalProps & WithTranslation> {
  public selectToken = (token: IToken) => {
    const { onSelectToken, onClose } = this.props;

    onSelectToken(token);
    onClose();
  };

  public renderTokenOption = (token: IToken) => {
    return (
      <div
        className={css(styles.SelectCoinModal_tokenRow)}
        onClick={() => this.selectToken(token)}
        key={`token-option-${token.id}`}
      >
        <div className={css(styles.SelectCoinModal_tokenLabel)}>
          <img
            className={css(styles.SelectCoinModal_tokenImage)}
            src={token.image || token.image_url}
          />
          <span className={css(styles.SelectCoinModal_tokenSymbol)}>{token.symbol}</span>
        </div>
        <span className={css(styles.SelectCoinModal_tokenQuantity)}>
          {token.full_amount_in_set}
        </span>
      </div>
    );
  };

  public render() {
    const { isModalOpen, enabledTokens, onClose } = this.props;

    return (
      <Modal
        open={isModalOpen}
        size="mini"
        className={`${css(styles.SelectCoinModal_container)} scrolling`}
        closeIcon={
          <CloseIcon customStyles={styles.SelectCoinModal_closeButton} onClick={onClose} />
        }
        onClose={onClose}
      >
        <Modal.Content className={css(styles.SelectCoinModal_modalContent)}>
          <div className={css(styles.SelectCoinModal_titleContainer)}>
            <span className={css(styles.SelectCoinModal_titleText)}>Select A Token</span>
          </div>
          <div className={css(styles.SelectCoinModal_tokenContainer)}>
            {enabledTokens.map(this.renderTokenOption)}
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withTranslation('components')(SelectCoinModal);
