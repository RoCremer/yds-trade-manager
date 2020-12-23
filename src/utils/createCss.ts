import { css } from 'aphrodite/no-important';
import { IResults } from '@typings/index';

/**
 * createCss
 * @param {object} styleSheet - A stylesheet using Aphrodite's StyleSheet.create()
 * @returns {object} res - Object containing classNames from Aphrodite's styleSheet
 */
const createCss = (styleSheet: any) => {
  if (typeof styleSheet !== 'object' || !styleSheet) {
    throw new Error('Error in createCss.js: stylesheet argument must be an Aphrodite stylesheet.');
  }
  const res: IResults = {};
  const keys = Object.keys(styleSheet);
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    const currentVal = styleSheet[k];
    // _definition identifies the value as an Aphrodite stylesheet property
    if (currentVal._definition) {
      res[k] = css(currentVal);
    } else if (typeof currentVal === 'object' && !Array.isArray(currentVal)) {
      res[k] = createCss(currentVal);
    }
  }
  return res;
};
export default createCss;
