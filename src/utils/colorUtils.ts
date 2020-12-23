import { StyleSheet } from 'aphrodite';
import tinycolor from 'tinycolor2';

import { COLORS } from '@constants/index';

const priceColors = StyleSheet.create({
  priceUp: {
    color: COLORS.green,
  },
  priceDown: {
    color: COLORS.red,
  },
  priceNeutral: {
    color: COLORS.darkGray,
  },
});

export const darken = (color: string) =>
  tinycolor(color)
    .darken(5)
    .toString();

export const setAlpha = (color: string) =>
  tinycolor(color)
    .setAlpha(0.25)
    .toString();

export const getPriceTextColor = (price: string) => {
  if (price && price[0] !== '-') {
    return priceColors.priceUp;
  } else if (price && price[0] === '-') {
    return priceColors.priceDown;
  } else {
    return priceColors.priceNeutral;
  }
};

export const generatePendingAnimationStyle = (
  color: string = COLORS.darkBlue,
  shimmerColor: string,
) => ({
  animationDuration: '1.5s',
  animationName: 'shimmer',
  animationIterationCount: 'infinite',
  background: `${color} linear-gradient(to right, ${color}, ${shimmerColor}, ${color})`,
  backgroundPosition: '-4rem top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '6rem 100%',
  color: shimmerColor,
  display: 'inline-block',
});
export const generatePendingAnimationHoverStyle = (
  color: string = COLORS.darkBlueDarkened,
  shimmerColor: string,
) => ({
  ...generatePendingAnimationStyle(color, shimmerColor),
  background: `${color} linear-gradient(to right, ${color}, ${shimmerColor}, ${color})`,
});
