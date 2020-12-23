import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, SemanticCOLORS } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { SUBDOMAIN, COLORS } from '@constants/index';

import { ProgressBar } from '@components/index';

export const styles = StyleSheet.create({
  PendingTransaction_title: {
    textAlign: 'center',
    margin: '20px',
  },
  PendingTransaction_image: {
    display: 'block',
    width: '60px',
    height: '60px',
    margin: '40px auto',
  },
  PendingTransaction_text: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  PendingTransaction_transactionButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  PendingTransaction_viewTransactionButton: {
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
});

export interface ITransactionPendingProps {
  progressBarColor?: SemanticCOLORS;
  transactionId?: string;
  title?: string;
  text?: any;
  image?: any;
  image_url?: any;
  maxLoadTimeInSeconds?: number;
}

const PendingTransaction = (props: ITransactionPendingProps & WithTranslation) => {
  const {
    title,
    text,
    image,
    image_url,
    transactionId,
    maxLoadTimeInSeconds,
    progressBarColor,
    t,
  } = props;

  return (
    <div>
      {image}
      {image_url && <img src={image_url} className={css(styles.PendingTransaction_image)} />}
      <Header as="h3" className={css(styles.PendingTransaction_title)}>
        {title || t('modals.transaction-pending-title')}
      </Header>

      <p className={css(styles.PendingTransaction_text)}>
        {text || t('modals.transaction-pending-description')}
      </p>

      <div className={css(styles.PendingTransaction_transactionButtonWrapper)}>
        <a
          className={css(styles.PendingTransaction_viewTransactionButton)}
          href={`https://${SUBDOMAIN}.etherscan.io/tx/${transactionId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Transaction →
        </a>
      </div>

      <ProgressBar pendingText="" color={progressBarColor} seconds={maxLoadTimeInSeconds} />
    </div>
  );
};

export default withTranslation('components')(PendingTransaction);
