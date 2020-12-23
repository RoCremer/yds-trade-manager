import { StyleSheet, css } from 'aphrodite';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import logoImg from '@img/logos/set-and-tokensets-logo.svg';

const styles = StyleSheet.create({
  MinimalNavBar_logo: {
    height: '40px',
  },
  MinimalNavBar_navbarContainer: {
    paddingBottom: '12px',
    paddingTop: '12px',
    textAlign: 'center',
  },
});

interface IMinimalNavBarProps {
  // The page that the user is currently on.
  readonly view: 'Onboarding' | 'Sign Up' | 'Sign Up Success' | 'Sign In' | 'Sign In Intro';
}

class MinimalNavBar extends PureComponent<IMinimalNavBarProps> {
  render() {
    return (
      <Container className={css(styles.MinimalNavBar_navbarContainer)}>
        <Link to="/">
          <img alt="Set logo" className={css(styles.MinimalNavBar_logo)} src={logoImg} />
        </Link>
      </Container>
    );
  }
}

export default MinimalNavBar;
