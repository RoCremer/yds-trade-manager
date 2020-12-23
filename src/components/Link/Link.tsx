import React, { PureComponent } from 'react';
import { Link as A } from 'react-router-dom';

import linkStyles from './styles';
import { getClassNames } from '@utils/index';

interface ILinkProps {
  readonly target: string;
  readonly to: string;
  readonly type: string;
  readonly styles?: object;
  readonly onClick?: (...args: any[]) => any;
}

export default class Link extends PureComponent<ILinkProps> {
  public static get defaultProps() {
    return {
      type: 'blue',
      children: '',
      styles: {},
    };
  }

  public render() {
    const { target, to, type, children, styles, onClick, ...props } = this.props;
    const className = getClassNames(type, linkStyles);
    return (
      <A to={to} className={className} style={styles} target={target} onClick={onClick} {...props}>
        {children}
      </A>
    );
  }
}
