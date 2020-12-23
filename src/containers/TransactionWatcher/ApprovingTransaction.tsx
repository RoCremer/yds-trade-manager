import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Loader } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';

export const styles = StyleSheet.create({
  ApprovingTransaction_title: {
    textAlign: 'center',
    margin: '20px',
  },
  ApprovingTransaction_image: {
    display: 'block',
    width: '60px',
    height: '60px',
    margin: '40px auto',
  },
  ApprovingTransaction_text: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  ApprovingTransaction_loaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
});

export interface IApprovingTransactionProps {
  title?: string;
  text?: any;
  image?: any;
  image_url?: any;
}

const ApprovingTransaction = (props: IApprovingTransactionProps & WithTranslation) => {
  const { title, text, image, image_url, t } = props;

  return (
    <div>
      {image}
      {image_url && <img src={image_url} className={css(styles.ApprovingTransaction_image)} />}
      <Header as="h3" className={css(styles.ApprovingTransaction_title)}>
        {title || t('modals.transaction-approving-title')}
      </Header>

      <p className={css(styles.ApprovingTransaction_text)}>
        {text || t('modals.transaction-approving-description')}
      </p>

      <div className={css(styles.ApprovingTransaction_loaderWrapper)}>
        <Loader active inline="centered" className="modal-loader" />
      </div>
    </div>
  );
};

export default withTranslation('components')(ApprovingTransaction);
