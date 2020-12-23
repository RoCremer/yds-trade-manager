import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Button } from 'semantic-ui-react';

import { COLORS, SUBDOMAIN } from '@constants/index';
import { withTranslation, WithTranslation } from 'react-i18next';

export const styles = StyleSheet.create({
  TransactionCompleted_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  TransactionCompleted_successImage: {
    width: '70px',
    margin: '20px',
  },
  TransactionCompleted_title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  TransactionCompleted_text: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  TransactionCompleted_transactionButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  TransactionCompleted_viewTransactionButton: {
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
  TransactionCompleted_button: {
    height: '45px',
    width: '100%',
    backgroundColor: COLORS.blue,
    color: COLORS.white,
  },
});

export interface ITransactionCompletedProps {
  title?: string;
  text?: any;
  transactionHash: string;
  onFinish: (...args: any[]) => any;
}

const TransactionCompleted = (props: ITransactionCompletedProps & WithTranslation) => {
  const { title, text, transactionHash, onFinish, t } = props;

  return (
    <div className={css(styles.TransactionCompleted_container)}>
      <img
        alt="Check mark"
        src="https://set-core.s3.amazonaws.com/img/onboarding/check-green-bg.svg"
        className={css(styles.TransactionCompleted_successImage)}
      />
      <Header as="h3" className={css(styles.TransactionCompleted_title)}>
        {title || t('components:modals.transaction-finished-title')}
      </Header>

      <p className={css(styles.TransactionCompleted_text)}>
        {text || t('components:modals.transaction-finished-description')}
      </p>

      <div className={css(styles.TransactionCompleted_transactionButtonWrapper)}>
        <a
          className={css(styles.TransactionCompleted_viewTransactionButton)}
          href={`https://${SUBDOMAIN}.etherscan.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Transaction →
        </a>
      </div>

      <Button onClick={onFinish} className={css(styles.TransactionCompleted_button)}>
        {t('common:buttons.finish')}
      </Button>
    </div>
  );
};

export default withTranslation()(TransactionCompleted);
