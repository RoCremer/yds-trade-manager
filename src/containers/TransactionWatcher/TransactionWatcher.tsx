import React, { PureComponent } from 'react';

import { TransactionStep } from './enums';
import ApprovingTransaction from './ApprovingTransaction';
import StartTransaction from './StartTransaction';
import PendingTransaction from './PendingTransaction';
import CompletedTransaction from './TransactionCompleted';
import FailedTransaction from './TransactionFailed';
import LongTransaction from './TransactionLong';

interface TransactionWatcherProps {
  transactionStep: TransactionStep;
  startTransactionComponent: any;
  pendingTransactionComponent: any;
  approvingTransactionComponent: any;
  completedTransactionComponent: any;
  failedTransactionComponent: any;
  longTransactionComponent: any;
}

class TransactionWatcher extends PureComponent<TransactionWatcherProps> {
  static get defaultProps() {
    return {
      transactionStep: TransactionStep.START_TRANSACTION,
      startTransactionComponent: <StartTransaction />,
      pendingTransactionComponent: <PendingTransaction />,
      approvingTransactionComponent: <ApprovingTransaction />,
      completedTransactionComponent: (
        <CompletedTransaction transactionHash="" onFinish={() => {}} />
      ),
      failedTransactionComponent: <FailedTransaction onRetry={() => {}} />,
      longTransactionComponent: (
        <LongTransaction transactionHash="" onClose={() => {}} onRetry={() => {}} />
      ),
    };
  }

  render() {
    const {
      transactionStep,
      startTransactionComponent,
      pendingTransactionComponent,
      approvingTransactionComponent,
      completedTransactionComponent,
      failedTransactionComponent,
      longTransactionComponent,
    } = this.props;

    switch (transactionStep) {
      case TransactionStep.START_TRANSACTION:
        return startTransactionComponent;

      case TransactionStep.PENDING_TRANSACTION:
        return pendingTransactionComponent;

      case TransactionStep.APPROVING_TRANSACTION:
        return approvingTransactionComponent;

      case TransactionStep.COMPLETED_TRANSACTION:
        return completedTransactionComponent;

      case TransactionStep.FAILED_TRANSACTION:
        return failedTransactionComponent;

      case TransactionStep.LONG_TRANSACTION:
        return longTransactionComponent;

      default:
        return null;
    }
  }
}

export default TransactionWatcher;
