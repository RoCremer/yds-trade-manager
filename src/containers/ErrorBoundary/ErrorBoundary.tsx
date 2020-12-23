import { StyleSheet, css } from 'aphrodite';
import React, { Fragment, PureComponent } from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from '@containers/NavBar';
import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';
import { Button } from '@components/index';

const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  ErrorBoundary_container: {
    width: '100%',
    margin: 'auto',
    minHeight: '600px',
    marginBottom: '50px',
    [MOBILE_MEDIA_QUERY]: {
      marginTop: '20px',
    },
  },
  ErrorBoundary_title: {
    fontSize: '100px',
    fontFamily: 'Graphik',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1.1,
    position: 'relative',
    color: COLORS.darkBlue,
    [MOBILE_MEDIA_QUERY]: {
      fontSize: '56px',
    },
  },
  ErrorBoundary_emoji: {
    fontSize: '90px',
    textAlign: 'center',
    lineHeight: 1.1,
    position: 'relative',
    [MOBILE_MEDIA_QUERY]: {
      fontSize: '64px',
    },
  },
  ErrorBoundary_paddingTop: {
    paddingTop: '26px',
  },
  ErrorBoundary_paddingBottom: {
    paddingTop: '60px',
  },
  ErrorBoundary_description: {
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
  ErrorBoundary_buttonContainer: {
    width: '100%',
    textAlign: 'center',
    marginTop: '50px',
  },
});

interface ErrorBoundaryProps {
  history: any;
  activeItem: string;
  children: JSX.Element[] | JSX.Element;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  unlisten: Function;

  state = {
    hasError: false,
  };

  componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      this.setState({ hasError: false });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  renderErrorPage = () => (
    <Fragment>
      <NavBar activeItem={location.pathname} history={history} />
      <Container className={css(styles.ErrorBoundary_container)}>
        <div className={css(styles.ErrorBoundary_emoji, styles.ErrorBoundary_paddingTop)}>🤯</div>
        <div className={css(styles.ErrorBoundary_title)}>Congrats, you</div>
        <div className={css(styles.ErrorBoundary_title)}>broke it.</div>
        <div className={css(styles.ErrorBoundary_buttonContainer)}>
          <Button
            onClick={() => window.location.reload()}
            text="Reload the page"
            style={{
              container: {
                width: '200px',
                height: '60px',
              },
            }}
          />
        </div>
      </Container>
    </Fragment>
  );

  componentDidCatch(_e: any) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return this.renderErrorPage();
    }
    return children;
  }
}

export default ErrorBoundary;
