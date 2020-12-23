import { StyleSheet } from 'aphrodite/no-important';

import { COLORS, STYLES } from '@constants/index';
import createCss from '@utils/createCss';

const { monoFont, fontWeights } = STYLES;
/*
 * Paragraph & span styles <p> & <span>
 */
const xxlarge = {
  fontWeight: fontWeights.semiBold,
  fontSize: '76px',
  lineHeight: '114px',
  color: COLORS.darkGray,
};
const xlarge = {
  fontWeight: fontWeights.semiBold,
  fontSize: '56px',
  lineHeight: '84px',
  color: COLORS.darkGray,
  letterSpacing: '-1px',
};
const large = {
  fontWeight: fontWeights.regular,
  fontSize: '20px',
  lineHeight: '38px',
  color: COLORS.darkGray,
};
const regular = {
  fontWeight: fontWeights.regular,
  fontSize: '16px',
  lineHeight: '24px',
  color: COLORS.darkGray,
};
const small = {
  fontWeight: fontWeights.regular,
  fontSize: '14px',
  lineHeight: '20px',
  color: COLORS.darkGray,
};
const xsmall = {
  fontWeight: fontWeights.regular,
  fontSize: '12px',
  lineHeight: '15px',
  color: COLORS.darkGray,
};
/*
 * Small headings <strong>
 */
const strong = {
  fontWeight: fontWeights.semiBold,
  fontSize: '16px',
};
/*
 * Mono fonts
 */
const hugeMono = {
  fontFamily: monoFont,
  fontWeight: fontWeights.light,
  fontSize: '56px',
  textTransform: 'uppercase' as 'uppercase',
};
const largeMono = {
  fontFamily: monoFont,
  fontWeight: fontWeights.regular,
  fontSize: '30px',
  textTransform: 'uppercase' as 'uppercase',
};
const regularMono = {
  fontFamily: monoFont,
  fontWeight: fontWeights.regular,
  fontSize: '20px',
  textTransform: 'uppercase' as 'uppercase',
};
/*
 * Misc styles
 */
const emphasis = {
  fontWeight: fontWeights.semiBold,
  fontStyle: 'normal',
  color: COLORS.darkBlue,
};
const warning = {
  fontWeight: fontWeights.semiBold,
  color: COLORS.red,
};
const connected = {
  fontWeight: fontWeights.semiBold,
  textTransform: 'uppercase' as 'uppercase',
  letterSpacing: '1px',
  color: COLORS.green,
};
/*
 * Measure (line-length)
 */
const wideMeasure = {
  maxWidth: '34em',
};
const regularMeasure = {
  maxWidth: '25em',
};
const narrowMeasure = {
  maxWidth: '20em',
};
const styles = StyleSheet.create({
  xxlarge,
  xlarge,
  large,
  regular,
  small,
  xsmall,
  strong,
  hugeMono,
  largeMono,
  regularMono,
  emphasis,
  warning,
  connected,
  wideMeasure,
  regularMeasure,
  narrowMeasure,
});

export default createCss(styles);
