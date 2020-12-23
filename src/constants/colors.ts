import tinycolor from 'tinycolor2';

import { IColors } from '@typings/index';

/* COLOR PALETTE */
const blueHex = '#2D2CE5';
const lightBlueHex = '#1A53F0';
const lightBlue2Hex = '#E0D8F4'; // Used for container borders
const lightBlue3Hex = '#6BB1FF';
const lightBlue4Hex = '#837AFF';
const mediumBlueHex = '#1C1BBC';
const darkBlueHex = '#1D144F';
const darkGrayHex = '#9B97B3';
const grayHex = '#DAD7E2';
const lightGrayHex = '#F4F4FA';
const lightGrayHex2 = '#FCFCFF';
const lightGrayHex3 = 'rgba(34,36,38,.15)'; // This is the exact border color of semantic-ui-react Tables
const greenHex = '#2BB160';
const lightGreenHex = '#E5FFEF';
const redHex = '#DF4857';
const pinkHex = '#F444AC';
const yellowHex = '#F1CD41';
const yellow2Hex = '#F3B731';
const whiteHex = '#FFFFFF';
const blackHex = '#000000';

/* DARKENED COLORS */
const darken = (color: string, percentage = 5) => tinycolor(color).darken(percentage).toString();
const blueDarkened: string = darken(blueHex, 10);
const mediumBlueDarkened: string = darken(mediumBlueHex);
const darkBlueDarkened: string = darken(darkBlueHex);
const darkGrayDarkened: string = darken(darkGrayHex);
const grayDarkened: string = darken(grayHex);
const lightGrayDarkened: string = darken(lightGrayHex);
const greenDarkened: string = darken(greenHex);
const redDarkened: string = darken(redHex);
const pinkDarkened: string = darken(pinkHex);
const yellowDarkened: string = darken(yellowHex);
const whiteDarkened: string = darken(whiteHex);
/* TRANSPARENT COLORS */
const setAlpha = (color: string, alpha = 0.25) => tinycolor(color).setAlpha(alpha).toString();
const blueAlpha25: string = setAlpha(blueHex);
const darkblueAlpha25: string = setAlpha(darkBlueHex);
const lightBlueAlpha25: string = setAlpha(lightBlueHex);
const lightBlueAlpha15: string = setAlpha(lightBlueHex, 0.15);
const lightBlue4Alpha10: string = setAlpha(lightBlue4Hex, 0.1);
const greenAlpha25: string = setAlpha(greenHex);
const redAlpha25: string = setAlpha(redHex);
const whiteAlpha50: string = setAlpha(whiteHex, 0.5);
const whiteAlpha75: string = setAlpha(whiteHex, 0.75);
const blackAlpha20: string = setAlpha(blackHex, 0.2);
const blackAlpha50: string = setAlpha(blackHex, 0.5);
/* MISC COLORS */
const semanticUIFocusInputBorderColor = '#85b7d9';

const colors: IColors = {
  // SOLID COLORS
  blue: blueHex,
  lightBlue: lightBlueHex,
  lightBlue2: lightBlue2Hex,
  lightBlue3: lightBlue3Hex,
  lightBlue4: lightBlue4Hex,
  mediumBlue: mediumBlueHex,
  darkBlue: darkBlueHex,
  darkGray: darkGrayHex,
  gray: grayHex,
  lightGray: lightGrayHex,
  lightGray2: lightGrayHex2,
  lightGray3: lightGrayHex3,
  green: greenHex,
  lightGreen: lightGreenHex,
  red: redHex,
  pink: pinkHex,
  yellow: yellowHex,
  yellow2: yellow2Hex,
  white: whiteHex,
  black: blackHex,
  // DARKED COLORS
  blueDarkened,
  mediumBlueDarkened,
  darkBlueDarkened,
  darkGrayDarkened,
  grayDarkened,
  lightGrayDarkened,
  greenDarkened,
  redDarkened,
  pinkDarkened,
  yellowDarkened,
  whiteDarkened,
  // TRANSPARENT
  blueAlpha25,
  darkblueAlpha25,
  lightBlueAlpha25,
  lightBlueAlpha15,
  lightBlue4Alpha10,
  greenAlpha25,
  redAlpha25,
  whiteAlpha50,
  whiteAlpha75,
  blackAlpha20,
  blackAlpha50,
  // MISC
  focusInputColor: semanticUIFocusInputBorderColor,
};

export default colors;
