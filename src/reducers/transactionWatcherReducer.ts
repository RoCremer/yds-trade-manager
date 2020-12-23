import {
  TRANSACTION_WATCHER_START_STEP,
  TRANSACTION_WATCHER_APPROVING_STEP,
  TRANSACTION_WATCHER_PENDING_STEP,
  TRANSACTION_WATCHER_FINISHED_STEP,
  TRANSACTION_WATCHER_FAILED_STEP,
  TRANSACTION_WATCHER_LONG_STEP,
  TRANSACTION_WATCHER_RESET_STEP,
} from '@actions/transactionWatcherActions';
import { TransactionStep } from '@containers/TransactionWatcher/enums';

export interface TransactionWatcherReducerState {
  transactionStep: TransactionStep;
  transactionId: string | undefined;
}

const initialState: TransactionWatcherReducerState = {
  transactionStep: TransactionStep.START_TRANSACTION,
  transactionId: undefined,
};

const transactionWatcherReducer = (
  state = initialState,
  action: any,
): TransactionWatcherReducerState => {
  switch (action.type) {
    case TRANSACTION_WATCHER_START_STEP:
      return { transactionStep: TransactionStep.START_TRANSACTION, transactionId: undefined };
    case TRANSACTION_WATCHER_APPROVING_STEP:
      return { ...state, transactionStep: TransactionStep.APPROVING_TRANSACTION };
    case TRANSACTION_WATCHER_PENDING_STEP:
      return {
        transactionStep: TransactionStep.PENDING_TRANSACTION,
        transactionId: action.payload,
      };
    case TRANSACTION_WATCHER_FINISHED_STEP:
      return { ...state, transactionStep: TransactionStep.COMPLETED_TRANSACTION };
    case TRANSACTION_WATCHER_FAILED_STEP:
      return { ...state, transactionStep: TransactionStep.FAILED_TRANSACTION };
    case TRANSACTION_WATCHER_LONG_STEP:
      return { ...state, transactionStep: TransactionStep.LONG_TRANSACTION };
    case TRANSACTION_WATCHER_RESET_STEP:
      return { transactionStep: TransactionStep.START_TRANSACTION, transactionId: undefined };

    default:
      return state;
  }
};

export default transactionWatcherReducer;
