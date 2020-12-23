import { connect } from 'react-redux';

import TransactionWatcher from './TransactionWatcher';

const mapStateToProps = (state: any) => {
  return {
    transactionStep: state.transactionWatcher.transactionStep,
  };
};

export default connect(
  mapStateToProps,
  null,
)(TransactionWatcher);
