import { TransactionStep } from '@containers/TransactionWatcher/enums';
import { transactionStepSelector } from '@selectors/baseSelectors';

export const isTransactionPendingSelector = (state: any): boolean => {
  const currentTransactionStep = transactionStepSelector(state);

  return currentTransactionStep === TransactionStep.PENDING_TRANSACTION;
};

export const isTransactionApprovingSelector = (state: any): boolean => {
  const currentTransactionStep = transactionStepSelector(state);

  return currentTransactionStep === TransactionStep.APPROVING_TRANSACTION;
};
