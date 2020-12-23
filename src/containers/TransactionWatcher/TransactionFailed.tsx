import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Button, Icon } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';

import { SUBDOMAIN, COLORS } from '@constants/index';

export const styles = StyleSheet.create({
  TransactionFailed_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  TransactionFailed_failImage: {
    fontSize: '70px',
    margin: '40px',
    lineHeight: 1,
  },
  TransactionFailed_title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  TransactionFailed_text: {
    textAlign: 'center',
    marginBottom: '20px',
  },

  TransactionFailed_transactionButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  TransactionFailed_viewTransactionButton: {
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

  TransactionFailed_button: {
    height: '45px',
    width: '100%',
    backgroundColor: COLORS.blue,
    color: COLORS.white,
  },
});

export interface ITransactionFailedProps {
  title?: string;
  text?: any;
  transactionHash?: string;
  onRetry: (...args: any[]) => any;
}

const TransactionFailed = (props: ITransactionFailedProps & WithTranslation) => {
  const { title, text, transactionHash, onRetry, t } = props;

  return (
    <div className={css(styles.TransactionFailed_container)}>
      <Icon
        inverted
        name="remove circle"
        color="red"
        className={css(styles.TransactionFailed_failImage)}
      />
      <Header as="h3" className={css(styles.TransactionFailed_title)}>
        {title || t('components:modals.transaction-failed-title')}
      </Header>

      <p className={css(styles.TransactionFailed_text)}>
        {text || t('components:modals.transaction-failed-description')}
      </p>

      <div className={css(styles.TransactionFailed_transactionButtonWrapper)}>
        <a
          className={css(styles.TransactionFailed_viewTransactionButton)}
          href={`https://${SUBDOMAIN}.etherscan.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Transaction →
        </a>
      </div>

      <Button onClick={onRetry} className={css(styles.TransactionFailed_button)}>
        {t('common:buttons.retry')}
      </Button>
    </div>
  );
};

export default withTranslation()(TransactionFailed);
