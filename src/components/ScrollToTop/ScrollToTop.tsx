import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component<any> {
  public static get defaultProps() {
    return {
      location: {
        pathname: '',
        search: '',
        state: {},
      },
      children: {},
    };
  }

  public componentDidUpdate(prevProps: any) {
    const { location } = this.props;
    if (location !== prevProps.location) window.scrollTo(0, 0);
  }

  public render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
