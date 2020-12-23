import React, { PureComponent } from 'react';
import { css, StyleSheet } from 'aphrodite';
import tinycolor from 'tinycolor2';

import textStyles from './textStyles';
import { COLORS, TEXT_ELEMENTS } from '@constants/index';
import { Color } from '@typings/index';
import { getClassNames } from '@utils/index';

export interface ITextProps {
  readonly className?: string;
  readonly color?: Color;
  readonly 'data-select'?: string;
  readonly fontWeight?: number;
  readonly styles?: object;
  readonly tag?: string;
  readonly type?: string | string[];
}

export default class Text extends PureComponent<ITextProps> {
  static get defaultProps() {
    return {
      children: '',
      className: '',
      color: '',
      fontWeight: '',
      styles: {},
      tag: 'span',
      type: 'regular',
    };
  }

  static onColor(color: Color) {
    if (!color) return '';
    let c;
    if (typeof color === 'object') {
      // Handle tinyColor2 object
      c = color.toString();
    } else if (COLORS[color]) {
      // Handle color input that matches one of our colors
      c = COLORS[color];
    } else if (tinycolor(color).isValid()) {
      // Handle valid color string. Ex: '#2D2CE5'
      c = color;
    } else {
      throw new Error(
        'Error in Text component `color` prop: `color` prop must be a valid color. Received ' +
          color +
          '.' +
          "'`color` prop accepts a string or tinycolor2 object. \n Examples:\n 'blue'," +
          "'#3D3D3D', 'tinycolor('#2D2CE5')'",
      );
    }
    const textColor = { color: c };
    return css(StyleSheet.create({ textColor }).textColor);
  }

  static onFontWeight(fontWeight: number) {
    if (!fontWeight) return '';
    const fontWeightStyle = { fontWeight };
    return css(StyleSheet.create({ fontWeight: fontWeightStyle }).fontWeight);
  }

  render() {
    const {
      children,
      className,
      color,
      fontWeight,
      styles,
      tag,
      type,
    } = this.props;
    const colorClass = Text.onColor(color);
    const fontWeightClass = Text.onFontWeight(fontWeight);
    let TextElement = TEXT_ELEMENTS[tag];
    let textClassName = getClassNames(type, textStyles) || '';
    if (!TextElement) TextElement = TEXT_ELEMENTS.span;
    if (colorClass) textClassName = textClassName.concat(' ').concat(colorClass);
    if (fontWeightClass) textClassName = textClassName.concat(' ').concat(fontWeightClass);
    if (className) textClassName = textClassName.concat(' ').concat(className);
    return (
      <TextElement className={textClassName} style={styles}>
        {children}
      </TextElement>
    );
  }
}
