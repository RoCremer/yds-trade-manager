import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '@constants/index';
import { IButtonStyles } from '@typings/index';

const buttonHoverKeyFrames = {
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
};

const animBg = {
  background: `linear-gradient(132deg, ${COLORS.blue}, ${COLORS.pink})`,
  backgroundSize: '400% 400%',
  backgroundPosition: '100px',
  animationName: [buttonHoverKeyFrames],
  animationDuration: '3s',
  animationIterationCount: 'infinite',
};

const styles = StyleSheet.create({
  container: {
    borderRadius: '4px',
    background: COLORS.blue,
    border: '2px solid transparent',
    padding: '15px 20px',
    cursor: 'pointer',
    transition: '0.2s',
    ':hover': {
      backgroundColor: COLORS.blueDarkened,
      boxShadow: `0 6px 18px ${COLORS.blueAlpha25}`,
    },
    ':active': {
      transform: 'scale(0.975)',
    },
  },
  icon: {
    color: COLORS.white,
    marginRight: '15px',
    verticalAlign: 'middle',
  },
  text: {
    color: COLORS.white,
    fontWeight: 500,
  },
});

interface IDecoration {
  isDisabled: boolean;
  isFullWidth: boolean;
  hasAnimatedBg: boolean;
  hasAnimatedBgOnHover: boolean;
  isInverted: boolean;
  color: string;
  style: any;
}

const buttonDecorator = ({
  isDisabled,
  isFullWidth,
  hasAnimatedBg,
  hasAnimatedBgOnHover,
  isInverted,
  color,
  style: customStyle,
}: IDecoration) => {
  const hasCustomStyle = !!customStyle.container || !!customStyle.text || !!customStyle.icon;
  const style: IButtonStyles = {
    containerStyleDecoration: {},
    textStyleDecoration: {},
    iconStyleDecoration: {},
  };
  if (!color && !isDisabled && !isFullWidth && !hasCustomStyle && !isInverted)
    return StyleSheet.create(style);
  // Full width style props
  if (isFullWidth) {
    style.containerStyleDecoration.width = '100%';
  }
  // Disabled style props
  if (isDisabled) {
    style.containerStyleDecoration.backgroundColor = COLORS.darkGray;
    style.containerStyleDecoration.cursor = 'not-allowed';
    style.containerStyleDecoration[':hover'] = {
      backgroundColor: COLORS.darkGrayDarkened,
      boxShadow: 'none',
    };
    style.textStyleDecoration.color = COLORS.white;
    if (customStyle.container && customStyle.container.width) {
      style.containerStyleDecoration.width = customStyle.container.width;
    }
    if (customStyle.container && customStyle.container.height) {
      style.containerStyleDecoration.height = customStyle.container.height;
    }
    if (customStyle.container && customStyle.container.padding) {
      style.containerStyleDecoration.padding = customStyle.container.padding;
    }
    return StyleSheet.create(style);
  }
  // Custom color styling
  if (color) {
    style.containerStyleDecoration.background = COLORS[color];
    style.containerStyleDecoration[':hover'] = {
      backgroundColor: COLORS[color.concat('Darkened')],
    };
  }
  if (isInverted) {
    style.containerStyleDecoration.backgroundColor = COLORS.white;
    style.textStyleDecoration.color = COLORS.darkBlue;
    style.containerStyleDecoration.border = `2px solid ${COLORS.gray}`;
    style.containerStyleDecoration[':hover'] = { backgroundColor: COLORS.lightGray };
  }
  // Animated background style
  if (hasAnimatedBg) {
    style.containerStyleDecoration = { ...style.containerStyleDecoration, ...animBg };
  }
  // Animated background style on hover
  if (hasAnimatedBgOnHover) {
    style.containerStyleDecoration = { ...style.containerStyleDecoration, ':hover': animBg };
  }
  // Custom styles for container
  if (customStyle.container) {
    style.containerStyleDecoration = {
      ...style.containerStyleDecoration,
      ...customStyle.container,
    };
  }
  // Custom styles for text
  if (customStyle.text) {
    style.textStyleDecoration = { ...style.textStyleDecoration, ...customStyle.text };
  }
  // Custom styles for icon
  if (customStyle.icon) {
    style.iconStyleDecoration = { ...style.iconStyleDecoration, ...customStyle.icon };
  }
  return StyleSheet.create(style);
};

export default {
  styleSheet: styles,
  buttonDecorator,
};
