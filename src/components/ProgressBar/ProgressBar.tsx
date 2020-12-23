import { css, StyleSheet } from 'aphrodite';
import React, { PureComponent } from 'react';
import { Progress, SemanticCOLORS } from 'semantic-ui-react';

import i18n from '../../i18n';
import { BigNumber } from '@utils/index';

const styles = StyleSheet.create({
  ProgressBar_container: {
    textAlign: 'center',
  },
  ProgressBar_pendingText: {
    marginBottom: '5px',
  },
});

interface IProgressBarProps {
  readonly seconds: number;
  readonly color?: SemanticCOLORS;
  readonly pendingText: string;
  readonly pendingContinuedText: string;
  readonly overrideProgressPercent?: number;
  readonly getProgress: (...args: any[]) => any;
}

interface IProgressBarState {
  readonly buySubmissionProgress: BigNumber;
  readonly submissionProgressInterval: any;
}

export default class ProgressBar extends PureComponent<IProgressBarProps, IProgressBarState> {
  state = {
    buySubmissionProgress: new BigNumber(0),
    submissionProgressInterval: undefined as any,
  };

  public static get defaultProps() {
    return {
      seconds: 30,
      color: 'green',
      pendingText: i18n.t('components:progress-bar.working'),
      pendingContinuedText: i18n.t('components:progress-bar.still-working'),
      getProgress: () => {},
    };
  }

  componentDidMount() {
    this.initProgressInterval();
  }

  componentWillUnmount() {
    this.resetProgressInterval();
  }

  public incrementProgressBar = () => {
    const { getProgress, seconds } = this.props;
    const { buySubmissionProgress, submissionProgressInterval } = this.state;

    if (buySubmissionProgress.lt(100)) {
      const incrementation = new BigNumber(100).div(seconds);
      const newProgressValue = buySubmissionProgress.plus(incrementation);
      this.setState({ buySubmissionProgress: newProgressValue });
      getProgress(newProgressValue);

      if (newProgressValue.gte(100)) {
        clearInterval(submissionProgressInterval);
      }
    }
  };

  public initProgressInterval = () => {
    const { overrideProgressPercent } = this.props;
    if (overrideProgressPercent !== undefined) return;

    const interval = setInterval(this.incrementProgressBar, 1000);
    this.setState({ submissionProgressInterval: interval });
  };

  public resetProgressInterval = () => {
    const { overrideProgressPercent } = this.props;
    if (overrideProgressPercent !== undefined) return;

    const { submissionProgressInterval } = this.state;

    this.setState({
      submissionProgressInterval: undefined,
      buySubmissionProgress: new BigNumber(0),
    });
    clearInterval(submissionProgressInterval);
  };

  public render() {
    const { pendingText, pendingContinuedText, overrideProgressPercent, color } = this.props;
    const { buySubmissionProgress } = this.state;
    const progressPercentage = overrideProgressPercent || buySubmissionProgress.toNumber();

    return (
      <div className={css(styles.ProgressBar_container)}>
        {buySubmissionProgress.lt(100) ? (
          <p className={css(styles.ProgressBar_pendingText)}>{pendingText}</p>
        ) : (
          <p className={css(styles.ProgressBar_pendingText)}>{pendingContinuedText}</p>
        )}
        <Progress percent={progressPercentage} active size="tiny" color={color} />
      </div>
    );
  }
}
