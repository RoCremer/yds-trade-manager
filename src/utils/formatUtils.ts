import Web3 from 'web3';
import BigNumber from './bigNumber';

const web3 = new Web3();

const isZero = (value: number) => value === 0;

export const getEthFromWei = (amount = '0') => {
  return web3.utils.fromWei(amount, 'ether').toString();
};

export const truncateEthAddress = (address: string) =>
  address
    .slice(0, 6)
    .concat('...')
    .concat(address.slice(address.length - 4, address.length));

/**
 * truncateTokenAmount
 * Truncates token amount to 6 decimal places for DISPLAY PURPOSES ONLY. Uses parseFloat to remove trailing zeros.
 */
export const truncateTokenAmount = (tokenAmount: string | number = '0', roundTo = 6) => {
  // Parse float to determine if tokenAmount is a number
  const parsedTokenAmount = parseFloat(tokenAmount as string);
  const isParsedTokenAmountNaN = isNaN(parsedTokenAmount);
  const tokenAmountString = parsedTokenAmount.toFixed(roundTo);
  // If it is a number, use the parsedTokenAmount. If not, default to '0'.
  const amountBigNumber = new BigNumber(isParsedTokenAmountNaN ? '0' : tokenAmountString);
  return parseFloat(amountBigNumber.toFixed(roundTo, BigNumber.ROUND_DOWN));
};

export const truncateString = (string: string, maxLength: number) => {
  if (string.length > maxLength) {
    return string.slice(0, maxLength).concat('...');
  }
  return string;
};

export const formatToDecimals = (value = '0', decimals = '0') => {
  const decimalBN = new BigNumber(decimals).toNumber();
  const decimalDivider = new BigNumber(10).toPower(decimalBN);
  return new BigNumber(value).div(decimalDivider);
};

export const formatTokenUnit = (quantity = '0', decimals: string | number = '18', precision = 2) =>
  new BigNumber(quantity || 0)
    .div(10 ** new BigNumber(decimals).toNumber())
    .toFormat(isZero(new BigNumber(quantity).toNumber()) ? 0 : precision)
    .toString();

export const tokenToBaseUnits = (quantity: string, decimals?: string | number): BigNumber => {
  const bigQuantity = new BigNumber(quantity);
  const tokenBaseMultiple = new BigNumber(10).pow(Number(decimals) || 18);

  return bigQuantity.mul(tokenBaseMultiple);
};

export const tokenFromBaseUnits = (quantity: string, decimals?: string | number): BigNumber => {
  const bigQuantity = new BigNumber(quantity);
  const tokenBaseMultiple = new BigNumber(10).pow(Number(decimals) || 18);

  return bigQuantity.div(tokenBaseMultiple);
};

export const calculateComponentsRequired = (
  quantity: string | number | BigNumber = '0',
  naturalUnit: string | number | BigNumber = 0,
  componentUnits: string | number | BigNumber = '0',
) =>
  new BigNumber(quantity || 0)
    .times(10 ** 18)
    .div(naturalUnit)
    .times(componentUnits)
    .toString();

export const trimLessThanSign = (val: string) => {
  if (val && val[0] === '<') {
    return val.slice(1);
  }
  return val;
};

export const trimDollarSign = (val: string) => {
  if (val && val[0] === '$') {
    return val.slice(1);
  }

  // For negative numbers. e.g. -$4.50
  if (val && val[1] === '$') {
    return val[0].concat(val.slice(2));
  }

  return val;
};

export const trimPercentSign = (val: string) => {
  if (val && val.length && val[val.length - 1] === '%') {
    return val.slice(0, val.length - 1);
  }
  return val;
};

export const shortenedDollarAmount = (val: string) => {
  const dollarValue = new BigNumber(extractNumberFromDollarAmount(val));

  if (dollarValue.gte(1e9)) {
    return `$${dollarValue.div(1e9).toFixed(1)}b`;
  } else if (dollarValue.gte(1e6)) {
    return `$${dollarValue.div(1e6).toFixed(1)}m`;
  } else if (dollarValue.gte(1e3)) {
    return `$${dollarValue.div(1e3).toFixed(1)}k`;
  }
  return val;
};

export const extractNumberFromDollarAmount = (val: string) => {
  if (val) {
    return trimDollarSign(val.replace(/,/g, ''));
  }
  return '0';
};

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const trimDecimals = (val: string, _decimalPlaces = 2) => {
  if (val && val.split('.').length === 2) {
    const splitVal = val.slice().split('.');
    splitVal[1] = splitVal[1].slice(0, _decimalPlaces);
    return parseFloat(splitVal.join('.')).toFixed(_decimalPlaces).toString();
  }
  return val;
};

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const convertNumberToDollars = (quantity: number) => {
  if (typeof quantity !== 'number' && !quantity) return;

  return formatter.format(quantity);
};

/**
 * Truncate a string stopping at spaces or "seperator" values.
 * Prevents truncating a string in the middle of a word.
 * @param input String to truncate
 * @param maxLen Maximum length of words
 * @param separator seperator to truncate by
 */
export const truncateStringByWords = (input = '', maxLength = 200, separator = ' ') => {
  if (input.length <= maxLength) return input;
  return input.substr(0, input.lastIndexOf(separator, maxLength));
};
