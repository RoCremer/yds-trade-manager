import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite/no-important';
import { Icon, SemanticICONS } from 'semantic-ui-react';

import buttonStyles from './buttonStyles';

const { styleSheet, buttonDecorator } = buttonStyles;
const { container: containerStyles, icon: iconStyles, text: textStyles } = styleSheet;

export interface IButtonProps {
  readonly isDisabled?: boolean;
  readonly isFullWidth?: boolean;
  readonly isInverted?: boolean;
  readonly hasAnimatedBg?: boolean;
  readonly hasAnimatedBgOnHover?: boolean;
  readonly className?: string;
  readonly color?: string;
  readonly externalHref?: string;
  readonly icon?: string;
  readonly iconType?: string;
  readonly text?: string;
  readonly to?: string;
  readonly style?: object;
  readonly onClick?: (...args: any[]) => any;
}

class Button extends PureComponent<IButtonProps> {
  public static get defaultProps() {
    return {
      isDisabled: false,
      isFullWidth: false,
      isInverted: false,
      hasAnimatedBg: false,
      hasAnimatedBgOnHover: false,
      className: '',
      children: '',
      color: '',
      externalHref: '',
      icon: '',
      iconType: 'img',
      text: '',
      to: '',
      style: {},
      onClick: () => {},
    };
  }

  public render() {
    const {
      className,
      children,
      color,
      externalHref,
      iconType,
      isDisabled,
      isFullWidth,
      isInverted,
      hasAnimatedBg,
      hasAnimatedBgOnHover,
      icon,
      onClick,
      style,
      text,
      to,
    } = this.props;
    const decoration = buttonDecorator({
      isDisabled,
      isFullWidth,
      hasAnimatedBg,
      hasAnimatedBgOnHover,
      isInverted,
      color,
      style,
    });
    const { containerStyleDecoration, textStyleDecoration, iconStyleDecoration } = decoration;
    const button = (
      <button
        type="button"
        className={`${css(containerStyles, containerStyleDecoration)} ${className}`}
        onClick={isDisabled ? null : onClick}
      >
        {icon ? (
          iconType === 'img' ? (
            <img
              src={icon}
              className={css(iconStyles, iconStyleDecoration)}
              alt="Button icon"
            />
          ) : (
            <Icon
              name={icon as SemanticICONS}
              className={css(iconStyles, iconStyleDecoration)}
              alt="Button icon"
            />
          )
        ) : null}
        <span className={css(textStyles, textStyleDecoration)}>
          {text}
        </span>
        {children}
      </button>
    );

    if (to) {
      return <Link to={to}>{button}</Link>;
    } else if (externalHref) {
      return (
        <a href={externalHref} target="_blank" rel="noopener">
          {button}
        </a>
      );
    }
    return button;
  }
}

export default Button;
