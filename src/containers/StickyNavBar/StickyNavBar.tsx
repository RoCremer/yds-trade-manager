import { StyleSheet, css } from 'aphrodite';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import NavBar from '../NavBar';
import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';
import { IWindowDimensions, IRebalancingSet } from '@typings/index';

const styles = StyleSheet.create({
  StickyNavBar_outerContainer: {
    background: COLORS.white,
    position: 'fixed',
    transition: '0.2s',
    zIndex: 10000,
    top: '-120px',
    [WINDOW_DIMENSIONS.TABLET_MEDIA_QUERY]: {
      background: 'transparent',
    },
  },
  StickyNavBar_revealed: {
    top: 0,
  },
  StickyNavBar_progressBar: {
    position: 'absolute',
    height: '4px',
    bottom: 0,
    transition: '0.05s',
    [WINDOW_DIMENSIONS.TABLET_MEDIA_QUERY]: {
      display: 'none',
    },
  },
});

export interface IStickyNavBarProps {
  activeItem: string;
  history: any;
  windowDimension: IWindowDimensions;
  currentRebalancingSet: IRebalancingSet;
}

class StickyNavBar extends PureComponent<IStickyNavBarProps> {
  render() {
    const { activeItem, history, windowDimension, currentRebalancingSet } = this.props;
    const { shouldRevealStickyNavBar, scrollPercent } = windowDimension;

    const revealedStyle = shouldRevealStickyNavBar ? styles.StickyNavBar_revealed : undefined;

    const colors = currentRebalancingSet ? currentRebalancingSet.colors : ['000', 'FFF'];
    return (
      <Container className={css(styles.StickyNavBar_outerContainer, revealedStyle)} fluid>
        <div
          className={css(styles.StickyNavBar_progressBar)}
          style={{
            width: `${scrollPercent}%`,
            background: `linear-gradient(to right, #${colors[0]}, #${colors[1]})`,
          }}
        />
        <NavBar activeItem={activeItem} history={history} />
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  windowDimension: state.windowDimension,
  currentRebalancingSet: state.rebalancing.currentRebalancingSet,
});

export default connect(mapStateToProps)((StickyNavBar as any) as React.SFC<IStickyNavBarProps>);
