import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Button } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';

import { SUBDOMAIN, COLORS } from '@constants/index';
import pendingIcon from '@img/icons/pending-large.svg';

export const styles = StyleSheet.create({
  TransactionLong_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  TransactionLong_pendingImage: {
    width: '70px',
    margin: '40px',
    padding: '10px',
    backgroundColor: COLORS.green,
    borderRadius: '50%',
  },
  TransactionLong_title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  TransactionLong_text: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  TransactionLong_transactionButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  TransactionLong_viewTransactionButton: {
    padding: '5px 10px',
    color: COLORS.darkGray,
    fontSize: '12px',
    border: `1px solid ${COLORS.darkGray}`,
    borderRadius: '4px',
    marginBottom: '40px',
    ':hover': {
      backgroundColor: COLORS.lightGray,
    },
  },
  TransactionLong_buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  TransactionLong_button: {
    height: '45px',
    width: '48%',
    backgroundColor: COLORS.blue,
    color: COLORS.white,
  },
  TransactionLong_closeButton: {
    backgroundColor: COLORS.darkBlue,
  },
});

export interface ITransactionLongProps {
  title?: string;
  text?: any;
  transactionHash: string;
  onClose: (...args: any[]) => any;
  onRetry: (...args: any[]) => any;
}

const TransactionLong = (props: ITransactionLongProps & WithTranslation) => {
  const { title, text, transactionHash, onClose, onRetry, t } = props;

  return (
    <div className={css(styles.TransactionLong_container)}>
      <img alt="Pending" src={pendingIcon} className={css(styles.TransactionLong_pendingImage)} />
      <Header as="h3" className={css(styles.TransactionLong_title)}>
        {title || t('components:modals.transaction-long-title')}
      </Header>

      <p className={css(styles.TransactionLong_text)}>
        {text || t('components:modals.transaction-long-description')}
      </p>

      <div className={css(styles.TransactionLong_transactionButtonWrapper)}>
        <a
          className={css(styles.TransactionLong_viewTransactionButton)}
          href={`https://${SUBDOMAIN}.etherscan.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Transaction →
        </a>
      </div>

      <div className={css(styles.TransactionLong_buttonContainer)}>
        <Button
          onClick={onClose}
          className={css(styles.TransactionLong_button, styles.TransactionLong_closeButton)}
        >
          {t('common:buttons.close')}
        </Button>
        <Button onClick={onRetry} className={css(styles.TransactionLong_button)}>
          {t('common:buttons.retry')}
        </Button>
      </div>
    </div>
  );
};

export default withTranslation()(TransactionLong);
