import { StyleSheet, css } from 'aphrodite';
import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';

import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';

const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  MissingRoute_container: {
    width: '100%',
    margin: 'auto',
    minHeight: '600px',
  },
  MissingRoute_oops: {
    fontSize: '126px',
    fontFamily: 'Graphik',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '60px',
    lineHeight: 1.5,
    letterSpacing: '-2px',
    position: 'relative',
    color: COLORS.darkBlue,
    [MOBILE_MEDIA_QUERY]: {
      fontSize: '86px',
    },
  },
  MissingRoute_oopsEmoji: {
    fontSize: '80px',
    [MOBILE_MEDIA_QUERY]: {
      fontSize: '58px',
    },
  },
  MissingRoute_description: {
    color: COLORS.darkGray,
    fontFamily: 'Graphik',
    fontSize: '24px',
    lineHeight: '30px',
    textAlign: 'center',
    width: '400px',
    margin: 'auto',
    [MOBILE_MEDIA_QUERY]: {
      fontSize: '18px',
      width: '80%',
    },
  },
  MissingRoute_buttonContainer: {
    width: '100%',
    textAlign: 'center',
    marginTop: '50px',
  },
});

class MissingRoute extends PureComponent {
  render() {
    return (
      <Container className={css(styles.MissingRoute_container)}>
        <div className={css(styles.MissingRoute_oops)}>
          O<span className={css(styles.MissingRoute_oopsEmoji)}>😦</span>ps.
        </div>
        <div className={css(styles.MissingRoute_description)}>
          Please sign in first!
        </div>
      </Container>
    );
  }
}

export default MissingRoute;
