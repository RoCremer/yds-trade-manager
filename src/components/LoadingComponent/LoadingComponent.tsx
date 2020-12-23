import React, { PureComponent } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Children } from '@typings/index';

interface ILoadingComponentProps {
  readonly children?: Children;
  readonly loading?: boolean;
  readonly inverted?: boolean;
  readonly showText?: boolean;
  readonly showWhileLoading?: boolean;
  readonly loadingText?: string;
  readonly style?: object;
}

class LoadingComponent extends PureComponent<ILoadingComponentProps> {
  public static get defaultProps() {
    return {
      inverted: true,
      loading: true,
      loadingText: 'loading',
      showText: true,
      showWhileLoading: true,
      style: {},
    };
  }

  public render() {
    const {
      loading,
      inverted,
      showText,
      loadingText,
      style,
      children,
      showWhileLoading,
    } = this.props;
    const showChildren = !loading || (loading && showWhileLoading);
    return (
      <div className="ui segment basic" style={{ padding: '0px', ...style }}>
        <Dimmer active={loading} inverted={inverted}>
          <Loader>{showText ? loadingText : null}</Loader>
        </Dimmer>
        {showChildren ? children : null}
      </div>
    );
  }
}

export default LoadingComponent;
