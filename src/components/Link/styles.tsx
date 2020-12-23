import { StyleSheet } from 'aphrodite/no-important';

import { COLORS, STYLES } from '@constants/index';
import createCss from '@utils/createCss';

const { fontWeights, transition } = STYLES;

// Link styles
const naked = {
  textDecoration: 'none',
  color: COLORS.darkGray,
  transition,
  ':hover': {
    color: COLORS.darkBlue,
  },
};

const inline = {
  color: COLORS.darkGray,
  paddingBottom: '4px',
  textDecoration: 'none',
  borderBottom: `1px solid ${COLORS.darkGray}`,
  transition,
  ':hover': {
    color: COLORS.darkBlue,
    borderBottom: `1px solid ${COLORS.darkBlue}`,
  },
};

const blue = {
  fontSize: '16px',
  fontWeight: fontWeights.semiBold,
  color: COLORS.blue,
  textDecoration: 'none',
  transition,
  ':hover': {
    color: COLORS.darkBlue,
  },
};

const styles = StyleSheet.create({
  naked,
  inline,
  blue,
});

export default createCss(styles);
