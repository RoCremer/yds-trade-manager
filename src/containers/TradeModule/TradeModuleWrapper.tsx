import React, { PureComponent } from 'react';
import { css, StyleSheet } from 'aphrodite';

import TransactionWatcher, {
  TransactionCompleted,
  TransactionFailed,
  TransactionLong,
  PendingTransaction,
} from '@containers/TransactionWatcher';
import TradeModule, { ITradeModuleProps } from './TradeModule';
import { COLORS } from '@constants/index';
import { Container } from 'semantic-ui-react';

type TradeModuleWrapperProps = {
  transactionId: string;
  image: string;
  username: string;
  onResetTransactionWatcher: (...args: any[]) => any;
} & ITradeModuleProps;

const styles = StyleSheet.create({
  TradeModuleWrapper_container: {
    display: 'flex',
    flexDirection: 'column',
    width: '460px',
    margin: '20px 0 40px',
    borderRadius: '4px',
    padding: '40px',
    border: `1px solid ${COLORS.lightBlue2}`,
  },
  TradeModuleWrapper_header: {
    width: '460px',
    marginTop: '40px',
  },
  TradeModuleWrapper_headerLink: {
    color: COLORS.black,
    cursor: 'pointer',
  },
  TradeModuleWrapper_headerDivider: {
    color: COLORS.black,
  },
  TradeModuleWrapper_subHeaderLink: {
    color: COLORS.darkGray,
  },
});

/**
 * @title TradeModuleWrapper
 * @author Set Protocol
 *
 * Wraps the TradeModule Container with TransactionWatcher + supplementary screens.
 */
class TradeModuleWrapper extends PureComponent<TradeModuleWrapperProps> {
  render() {
    const {
      onResetTransactionWatcher,
      username,
      transactionId,
      image,
      ...tradeModuleProps
    } = this.props;

    const startTransactionComponent = <TradeModule {...tradeModuleProps} />;
    const onFinish = () => (window.location.href = `/trader/${username}`);

    const pendingTransactionComponent = (
      <Container className={css(styles.TradeModuleWrapper_container)}>
        <PendingTransaction
          title={'Transaction Processing'}
          text={'Your trade is currently being executed and will be finished shortly.'}
          transactionId={transactionId}
          image_url={image}
        />
      </Container>
    );

    const imTokenCompletedTransactionComponent = (
      <Container className={css(styles.TradeModuleWrapper_container)}>
        <TransactionCompleted
          title={'Success'}
          text={'Your trade successfully completed.'}
          transactionHash={transactionId}
          onFinish={onFinish}
        />
      </Container>
    );
    const completedTransactionComponent = (
      <Container className={css(styles.TradeModuleWrapper_container)}>
        <TransactionCompleted
          title={'Success'}
          text={'Your trade successfully completed.'}
          transactionHash={transactionId}
          onFinish={onFinish}
        />
      </Container>
    );
    const longTransactionComponent = (
      <Container className={css(styles.TradeModuleWrapper_container)}>
        <TransactionLong
          title={'Taking longer than expected...'}
          text={'Transaction is taking longer than expected'}
          transactionHash={transactionId}
          onRetry={onResetTransactionWatcher}
          onClose={onFinish}
        />
      </Container>
    );
    const failedTransactionComponent = (
      <Container className={css(styles.TradeModuleWrapper_container)}>
        <TransactionFailed
          title={'Something went wrong'}
          text={'Your transaction was not successfully completed. Please try again.'}
          transactionHash={transactionId}
          onRetry={onResetTransactionWatcher}
        />
      </Container>
    );
    const approvingTransactionComponent = startTransactionComponent;

    return (
      <TransactionWatcher
        startTransactionComponent={startTransactionComponent}
        approvingTransactionComponent={approvingTransactionComponent}
        pendingTransactionComponent={pendingTransactionComponent}
        completedTransactionComponent={
          window.imToken ? imTokenCompletedTransactionComponent : completedTransactionComponent
        }
        longTransactionComponent={longTransactionComponent}
        failedTransactionComponent={failedTransactionComponent}
      />
    );
  }
}
export default TradeModuleWrapper;
