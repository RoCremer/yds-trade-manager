import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Header, Button } from 'semantic-ui-react';

import { COLORS } from '@constants/index';
import { withTranslation, WithTranslation } from 'react-i18next';

export const styles = StyleSheet.create({
  StartTransaction_title: {
    margin: '20px 0',
  },
  StartTransaction_buttonsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  StartTransaction_button: {
    width: '47%',
    height: '45px',
  },
  StartTransaction_cancelButton: {
    color: COLORS.white,
    backgroundColor: COLORS.darkBlue,
  },
  StartTransaction_confirmButton: {
    color: COLORS.white,
    backgroundColor: COLORS.blue,
  },
});

interface StartTransactionProps {
  title?: string;
  content?: any;
  buttons?: any;
  onSubmitTransaction?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
}

const StartTransaction = (props: StartTransactionProps & WithTranslation) => {
  const { title, content, buttons, onSubmitTransaction, onCancel, t } = props;
  return (
    <div>
      <Header as="h3" textAlign="center" className={css(styles.StartTransaction_title)}>
        {title}
      </Header>

      {content}

      {buttons ? (
        buttons
      ) : (
        <div className={css(styles.StartTransaction_buttonsContainer)}>
          <Button
            onClick={onCancel}
            className={css(styles.StartTransaction_button, styles.StartTransaction_cancelButton)}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            onClick={onSubmitTransaction}
            className={css(styles.StartTransaction_button, styles.StartTransaction_confirmButton)}
          >
            {t('buttons.confirm')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default withTranslation('common')(StartTransaction);
