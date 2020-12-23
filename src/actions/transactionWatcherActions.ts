import { toast } from 'react-toastify';
import { setProtocolInstanceSelector } from '@selectors/index';
import {
  confirmTransactionMined,
  userIsOnWrongNetwork,
  userRejectedMetamaskTransaction,
} from '@utils/web3Utils';
import i18n from '../i18n';
import { emptyActionGenerator, payloadActionGenerator } from '@utils/index';

export const TRANSACTION_WATCHER_START_STEP = 'TRANSACTION_WATCHER_START_STEP';
export const TRANSACTION_WATCHER_APPROVING_STEP = 'TRANSACTION_WATCHER_APPROVING_STEP';
export const TRANSACTION_WATCHER_PENDING_STEP = 'TRANSACTION_WATCHER_PENDING_STEP';
export const TRANSACTION_WATCHER_FINISHED_STEP = 'TRANSACTION_WATCHER_FINISHED_STEP';
export const TRANSACTION_WATCHER_FAILED_STEP = 'TRANSACTION_WATCHER_FAILED_STEP';
export const TRANSACTION_WATCHER_LONG_STEP = 'TRANSACTION_WATCHER_LONG_STEP';
export const TRANSACTION_WATCHER_RESET_STEP = 'TRANSACTION_WATCHER_RESET_STEP';

export const setTransactionStart = emptyActionGenerator(TRANSACTION_WATCHER_START_STEP);
export const setTransactionApproving = emptyActionGenerator(TRANSACTION_WATCHER_APPROVING_STEP);
export const setTransactionPending = payloadActionGenerator(TRANSACTION_WATCHER_PENDING_STEP);
export const setTransactionFinished = emptyActionGenerator(TRANSACTION_WATCHER_FINISHED_STEP);
export const setTransactionFailed = emptyActionGenerator(TRANSACTION_WATCHER_FAILED_STEP);
export const setTransactionLong = emptyActionGenerator(TRANSACTION_WATCHER_LONG_STEP);
export const resetTransactionWatcher = emptyActionGenerator(TRANSACTION_WATCHER_RESET_STEP);

/**
 * Initializes and watches the passed in transaction.
 * @param preparedTransaction - Ethereum transaction to be called.
 * @param maxMiningPollTime - Maximum amount of time to wait for a transaction to be mined before declaring it a "long mining period transaction"
 * @returns Transaction ID if successful or still pending. Returns undefined if transaction fails or reverts.
 */
export const submitEthereumTransaction = (
  preparedTransaction: () => Promise<string>,
  maxMiningPollTime = 30000,
) => async (dispatch: any, getState: any): Promise<string | undefined> => {
  const state = getState();
  const setProtocolInstance = setProtocolInstanceSelector(state);

  try {
    dispatch(setTransactionApproving());
    const transactionId = await preparedTransaction();

    dispatch(setTransactionPending(transactionId));
    const txnMined = await confirmTransactionMined(
      transactionId,
      setProtocolInstance,
      maxMiningPollTime,
    );

    if (txnMined) {
      dispatch(setTransactionFinished());
    } else {
      dispatch(setTransactionLong());
    }

    return transactionId;
  } catch (error) {
    if (userRejectedMetamaskTransaction(error)) {
      dispatch(resetTransactionWatcher());
      return;
    }

    if (userIsOnWrongNetwork(error)) {
      toast(i18n.t('components:toasts.errors.check-ethereum-main-net-connection'));
      dispatch(resetTransactionWatcher());
      return;
    }

    dispatch(setTransactionFailed());
  }
};

/**
 * Initializes and watches the passed in transaction.
 * @param preparedTransaction - SetJS transaction to be called.
 * @param maxMiningPollTime - Maximum amount of time to wait for a transaction to be mined before declaring it a "long mining period transaction"
 * @returns Transaction ID if successful or still pending. Returns undefined if transaction fails or reverts.
 */
export const submitSetJSTransaction = (
  preparedTransaction: () => Promise<{ [hash: string]: string }>,
  maxMiningPollTime = 30000,
) => async (dispatch: any, getState: any): Promise<string | undefined> => {
  const state = getState();
  const setProtocolInstance = setProtocolInstanceSelector(state);

  try {
    dispatch(setTransactionApproving());

    const { hash: transactionHash } = await preparedTransaction();

    dispatch(setTransactionPending(transactionHash));

    const txnMined = await confirmTransactionMined(
      transactionHash,
      setProtocolInstance,
      maxMiningPollTime,
    );

    if (txnMined) {
      dispatch(setTransactionFinished());
    } else {
      dispatch(setTransactionLong());
    }

    return transactionHash;
  } catch (error) {
    if (userRejectedMetamaskTransaction(error)) {
      dispatch(resetTransactionWatcher());
      return;
    }

    if (userIsOnWrongNetwork(error)) {
      toast(i18n.t('components:toasts.errors.check-ethereum-main-net-connection'));
      dispatch(resetTransactionWatcher());
      return;
    }

    dispatch(setTransactionFailed());
  }
};
