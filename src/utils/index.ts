/* eslint-disable import/prefer-default-export */
import BigNumber from './bigNumber';
import createCss from './createCss';
import { userAgent, isChrome, isBrave } from './browserUtils';
import {
  darken,
  setAlpha,
  getPriceTextColor,
  generatePendingAnimationStyle,
  generatePendingAnimationHoverStyle,
} from './colorUtils';
import {
  getEthFromWei,
  truncateEthAddress,
  truncateTokenAmount,
  truncateString,
  formatToDecimals,
  formatTokenUnit,
  calculateComponentsRequired,
  shortenedDollarAmount,
  titleCase,
  trimDollarSign,
  trimPercentSign,
  trimDecimals,
} from './formatUtils';
import getClassNames from './getClassNames';
import routerHistory from './history';
import { emptyActionGenerator, payloadActionGenerator } from './reduxHelpers';
import aphroditeAfterEach from './testHelpers';
import {
  detectOperaWallet,
  initSetProtocol,
  getWeb3,
  getAccount,
  getMessageSignature,
  getNetworkId,
  getWeb3Instance,
  getLedgerWeb3,
  initWeb3,
  isValidSetProtocol,
  ledgerEngine,
  login,
  userRejectedMetamaskTransaction,
} from './web3Utils';

export {
  // bigNumber
  BigNumber,
  // browserUtils
  userAgent,
  isChrome,
  isBrave,
  // colorUtils
  darken,
  setAlpha,
  getPriceTextColor,
  generatePendingAnimationStyle,
  generatePendingAnimationHoverStyle,
  // createCss
  createCss,
  // formatUtils
  getEthFromWei,
  truncateEthAddress,
  truncateTokenAmount,
  truncateString,
  formatToDecimals,
  formatTokenUnit,
  calculateComponentsRequired,
  shortenedDollarAmount,
  titleCase,
  trimDollarSign,
  trimPercentSign,
  trimDecimals,
  // getClassNames
  getClassNames,
  // history
  routerHistory,
  // reduxHelpers
  emptyActionGenerator,
  payloadActionGenerator,
  // testHelpers
  aphroditeAfterEach,
  // web3Utils
  detectOperaWallet,
  getAccount,
  getMessageSignature,
  getNetworkId,
  getWeb3Instance,
  getWeb3,
  getLedgerWeb3,
  initSetProtocol,
  initWeb3,
  isValidSetProtocol,
  login,
  ledgerEngine,
  userRejectedMetamaskTransaction,
};
