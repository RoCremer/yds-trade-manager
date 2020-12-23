import { css, StyleSheet } from 'aphrodite';
import React, { PureComponent } from 'react';

import closeIcon from '@img/icons/x-close.svg';

const styles = StyleSheet.create({
  CloseIcon_icon: {
    cursor: 'pointer',
    position: 'absolute',
    right: '10px',
    top: '10px',
    height: '20px',
    width: '20px',
    zIndex: 2000,
  },
});

interface ICloseIconProps {
  customStyles?: any;
  onClick: (...args: any[]) => any;
}

class CloseIcon extends PureComponent<ICloseIconProps> {
  render() {
    const { customStyles, onClick } = this.props;

    return (
      <img
        alt="Close icon"
        className={css(styles.CloseIcon_icon, customStyles && customStyles)}
        onClick={onClick}
        src={closeIcon}
      />
    );
  }
}

export default CloseIcon;
