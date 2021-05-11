import React, { PureComponent } from 'react';
import { css, StyleSheet } from 'aphrodite';
import classNames from 'classnames';
import { Container, Input } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import _ from 'lodash';

import SelectCoinModal from './SelectCoinModal';
import { COLORS, WINDOW_DIMENSIONS } from '@constants/index';
import { IMatch, FundDetails, IWindowDimensions, IToken, OrderData } from '@typings/index';
import FontAwesome from 'react-fontawesome';
// import { Redirect } from 'react-router-dom';

const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create({
  TradeModule_container: {
    display: 'flex',
    flexDirection: 'column',
    width: '460px',
    margin: '40px 0',
    borderRadius: '4px',
    border: `1px solid ${COLORS.lightBlue2}`,
  },
  TradeModule_titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderBottom: `1px solid ${COLORS.lightBlue2}`,
  },
  TradeModule_setIcon: {
    height: '40px',
    width: '40px',
    marginRight: '15px',
    marginLeft: '20px',
  },
  TradeModule_title: {
    fontSize: '26px',
    lineHeight: 1,
    fontWeight: 500,
    color: COLORS.darkBlue,
  },

  // Token Input/Output Fields
  TradeModule_orderContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
  },
  TradeModule_description: {
    lineHeight: 2,
    fontWeight: 500,
    color: COLORS.darkBlue,
  },
  TradeModule_tokenIcon: {
    height: '20px',
    width: '20px',
    marginRight: '5px',
  },
  TradeModule_inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    position: 'relative',
  },
  TradeModule_outputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  TradeModule_fromLabel: {
    color: COLORS.darkBlue,
    fontWeight: 600,
    marginBottom: '5px',
    fontSize: '0.8rem',
  },
  TradeModule_caretIcon: {
    marginLeft: '5px',
  },
  TradeModule_fromHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    [MOBILE_MEDIA_QUERY]: {
      display: 'block',
    },
  },
  TradeModule_fromBalanceLabel: {
    color: COLORS.darkGray,
    marginBotom: '5px',
    fontSize: '0.8rem',
  },
  TradeModule_inputQuantity: {
    width: '100%',
    fontSize: '16px',
    [MOBILE_MEDIA_QUERY]: {
      width: '150px',
    },
  },
  TradeModule_selectTokenButton: {
    width: '120px',
    height: '62px',
    display: 'flex',
    fontSize: '12px',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.darkBlue,
    backgroundColor: COLORS.lightGray,
    ':hover': {
      boxShadow: 'none',
      backgroundColor: COLORS.lightGrayDarkened,
    },
    [MOBILE_MEDIA_QUERY]: {
      width: '100px',
    },
  },
  TradeModule_submitButton: {
    color: COLORS.white,
    fontWeight: 600,
    padding: '20px',
    marginTop: '40px',
    backgroundColor: COLORS.blue,
    ':hover': {
      backgroundColor: COLORS.blueDarkened,
    },
  },
  TradeModule_disabledSubmitButton: {
    color: COLORS.white,
    fontWeight: 600,
    padding: '20px',
    marginTop: '40px',
    backgroundColor: COLORS.blueAlpha25,
    cursor: 'not-allowed',
  },
  TradeModule_maxButton: {
    color: COLORS.white,
    fontWeight: 600,
    padding: '8px 15px',
    top: '40px',
    right: '140px',
    zIndex: 2,
    position: 'absolute',
    userSelect: 'none',
    backgroundColor: COLORS.blue,
    ':hover': {
      backgroundColor: COLORS.blueDarkened,
    },
    [MOBILE_MEDIA_QUERY]: {
      position: 'relative',
      width: '250px',
      top: 0,
      right: 0,
      margin: '10px 0',
    },
  },
  TradeModule_transitionArrowContainer: {
    position: 'relative',
    right: '50%',
  },
  TradeModule_transitionArrow: {
    color: COLORS.gray,
  },

  // Order Summary
  TradeModule_orderSummaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    borderTop: `1px solid ${COLORS.lightBlue2}`,
  },
  TradeModule_orderSummaryTitle: {
    fontSize: '18px',
    fontWeight: 500,
    color: COLORS.darkBlue,
    paddingBottom: '10px',
  },
  TradeModule_orderSummaryRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderTop: `1px solid ${COLORS.lightBlue2}`,
  },
  TradeModule_orderSummaryFirstCell: {
    flex: 1,
    color: COLORS.darkBlue,
    fontWeight: 500,
    fontSize: '14px',
  },
  TradeModule_orderSummaryMiddleCell: {
    flex: 1,
    color: COLORS.darkBlue,
    textAlign: 'right',
    fontSize: '14px',
  },
  TradeModule_orderSummaryLastCell: {
    flex: 1,
    color: COLORS.darkBlue,
    textAlign: 'right',
    fontSize: '14px',
  },
});

export interface ITradeModuleProps {
  account: string;
  isSelectingInputToken: boolean;
  isSelectingOutputToken: boolean;
  selectedInputToken: IToken;
  selectedOutputToken: IToken;
  inputQuantity: string;
  orderData: OrderData;
  fundDetails: FundDetails;
  enabledOutputTokens: IToken[];
  windowDimensions: IWindowDimensions;
  match: IMatch;
  isFetchingOrderData: boolean;
  onFetchFund: (...args: any[]) => any;
  onFetchOrderData: (...args: any[]) => any;
  onSelectInputToken: (...args: any[]) => any;
  onSelectOutputToken: (...args: any[]) => any;
  onChangeInputQuantity: (...args: any[]) => any;
  onOpenSelectInputTokenModal: (...args: any[]) => any;
  onCloseSelectInputTokenModal: (...args: any[]) => any;
  onOpenSelectOutputTokenModal: (...args: any[]) => any;
  onCloseSelectOutputTokenModal: (...args: any[]) => any;
  onSubmitTrade: (...args: any[]) => any;
}

/**
 * @title TradeModule
 * @author Set Protocol
 *
 * A form for traders to publish an activity feed post associated with a given set.
 */
class TradeModule extends PureComponent<ITradeModuleProps & WithTranslation> {
  constructor(props: ITradeModuleProps & WithTranslation) {
    super(props);

    this.fetchCurrentSet();
  }

  componentDidUpdate(prevProps: ITradeModuleProps & WithTranslation) {
    const { selectedInputToken, selectedOutputToken, onFetchOrderData, inputQuantity } = this.props;

    if (
      !_.isEmpty(selectedInputToken) &&
      !_.isEmpty(selectedOutputToken) &&
      Number(inputQuantity) > 0 &&
      (!_.isEqual(selectedInputToken, prevProps.selectedInputToken) ||
        !_.isEqual(selectedOutputToken, prevProps.selectedOutputToken) ||
        inputQuantity != prevProps.inputQuantity)
    ) {
      onFetchOrderData();
    }
  }

  public fetchCurrentSet = () => {
    const { match, onFetchFund } = this.props;
    //const pathParam = match.params.set;

    var pathParam = match.params.set; // krugman added
    pathParam = 'sushihouse'; // krugman added

    onFetchFund(pathParam);
  };

  public renderInputTokenField = () => {
    const {
      selectedInputToken,
      onOpenSelectInputTokenModal,
      inputQuantity,
      onChangeInputQuantity,
    } = this.props;
    const { full_amount_in_set: fullAmountInSet } = selectedInputToken || {};

    const inactiveSelectTokenButton = (
      <button
        className={css(styles.TradeModule_selectTokenButton)}
        type="button"
        onClick={onOpenSelectInputTokenModal}
      >
        Select Token
        <span className={css(styles.TradeModule_caretIcon)}>
          <FontAwesome name="angle-down" />
        </span>
      </button>
    );

    const activeSelectTokenButton = (
      <button
        className={css(styles.TradeModule_selectTokenButton)}
        type="button"
        onClick={onOpenSelectInputTokenModal}
      >
        <img className={css(styles.TradeModule_tokenIcon)} src={selectedInputToken.image} />
        {selectedInputToken?.symbol}
        <span className={css(styles.TradeModule_caretIcon)}>
          <FontAwesome name="angle-down" />
        </span>
      </button>
    );

    const selectButton = selectedInputToken?.symbol
      ? activeSelectTokenButton
      : inactiveSelectTokenButton;

    return (
      <div className={css(styles.TradeModule_inputContainer)}>
        <div className={css(styles.TradeModule_fromHeader)}>
          <div className={css(styles.TradeModule_fromLabel)}>From</div>
          <div className={css(styles.TradeModule_fromBalanceLabel)}>
            {fullAmountInSet ? `Balance: ${fullAmountInSet} ${selectedInputToken?.symbol}` : ''}
          </div>
        </div>
        {fullAmountInSet && (
          <button
            className={css(styles.TradeModule_maxButton)}
            onClick={() => onChangeInputQuantity(fullAmountInSet)}
          >
            Max
          </button>
        )}
        <Input
          className={css(styles.TradeModule_inputQuantity)}
          label={selectButton}
          labelPosition="right"
          placeholder="0.00"
          onChange={e => {
            if (selectedInputToken?.symbol) {
              onChangeInputQuantity(e.target.value);
            }
          }}
          value={inputQuantity}
        />
      </div>
    );
  };

  public renderOutputTokenField = () => {
    const { selectedOutputToken, onOpenSelectOutputTokenModal, orderData } = this.props;

    const {
      display: { to_token_display_amount: toAmount } = {
        to_token_display_amount: '',
      },
    } = orderData;

    const inactiveSelectTokenButton = (
      <button
        className={classNames('label', css(styles.TradeModule_selectTokenButton))}
        type="button"
        onClick={onOpenSelectOutputTokenModal}
      >
        Select Token
        <span className={css(styles.TradeModule_caretIcon)}>
          <FontAwesome name="angle-down" />
        </span>
      </button>
    );

    const activeSelectTokenButton = (
      <button
        className={classNames('label', css(styles.TradeModule_selectTokenButton))}
        type="button"
        onClick={onOpenSelectOutputTokenModal}
      >
        <img className={css(styles.TradeModule_tokenIcon)} src={selectedOutputToken?.image_url} />
        {selectedOutputToken?.symbol}
        <span className={css(styles.TradeModule_caretIcon)}>
          <FontAwesome name="angle-down" />
        </span>
      </button>
    );

    const selectButton = selectedOutputToken?.symbol
      ? activeSelectTokenButton
      : inactiveSelectTokenButton;

    return (
      <div className={css(styles.TradeModule_outputContainer)}>
        <div className={css(styles.TradeModule_fromHeader)}>
          <div className={css(styles.TradeModule_fromLabel)}>To</div>
          <div className={css(styles.TradeModule_transitionArrowContainer)}>
            <FontAwesome className={css(styles.TradeModule_transitionArrow)} name="arrow-down" />
          </div>
        </div>
        <div
          className={classNames('ui right labeled input', css(styles.TradeModule_inputQuantity))}
        >
          <input placeholder="0.00" disabled type="text" tabIndex={-1} value={toAmount || ''} />
          {selectButton}
        </div>
      </div>
    );
  };

  public render() {
    const {
      // account,
      selectedInputToken,
      fundDetails,
      enabledOutputTokens,
      inputQuantity,
      isSelectingInputToken,
      isSelectingOutputToken,
      orderData,
      isFetchingOrderData,
      onSelectInputToken,
      onSelectOutputToken,
      onCloseSelectInputTokenModal,
      onCloseSelectOutputTokenModal,
      onSubmitTrade,
    } = this.props;

    const {
      display: {
        to_token_display_amount: toAmount,
        from_token_display_amount: fromAmount,
        to_token_price_usd: toTokenPriceUsd,
        from_token_price_usd: fromTokenPriceUsd,
        gas_costs_usd: gasCostUsd,
        gas_costs_eth: gasCostsEth,
        slippage,
        to_token: { symbol: toSymbol },
        from_token: { symbol: fromSymbol },
      } = {
        to_token_display_amount: null,
        from_token_display_amount: null,
        to_token_price_usd: null,
        from_token_price_usd: null,
        gas_costs_usd: null,
        gas_costs_eth: null,
        slippage: null,
        to_token: {},
        from_token: {},
      },
    } = orderData;
    const { full_amount_in_set: fullAmountInSet } = selectedInputToken || {};

    const greaterThanBalance =
      Number(inputQuantity) &&
      Number(fullAmountInSet) &&
      Number(inputQuantity) > Number(fullAmountInSet);
    const submitDisabled = isFetchingOrderData || _.isEmpty(orderData) || greaterThanBalance;

    // Redirect if not the operator
    // TODO: Uncomment after done with testing
    // if (fundDetails?.operator?.address && fundDetails?.operator?.address !== account) {
    //   return <Redirect to={'/'} />
    // }

    return (
      <Container className={css(styles.TradeModule_container)}>
        <SelectCoinModal
          enabledTokens={fundDetails?.components || []}
          isModalOpen={isSelectingInputToken}
          onSelectToken={onSelectInputToken}
          onClose={onCloseSelectInputTokenModal}
        />
        <SelectCoinModal
          enabledTokens={enabledOutputTokens}
          isModalOpen={isSelectingOutputToken}
          onSelectToken={onSelectOutputToken}
          onClose={onCloseSelectOutputTokenModal}
        />
        <div className={css(styles.TradeModule_titleContainer)}>
          <img
            className={css(styles.TradeModule_setIcon)}
            src="https://set-core.s3.amazonaws.com/img/assets/trade.svg"
          />
          <span className={css(styles.TradeModule_title)}>Trade</span>
        </div>

        <div className={css(styles.TradeModule_orderContainer)}>
          <span className={css(styles.TradeModule_description)}>
            Trade from one token to another for all participants in your portfolio. Trades are made
            across multiple DEXs.
          </span>

          <div className={css(styles.TradeModule_inputContainer)}>
            {this.renderInputTokenField()}
            {this.renderOutputTokenField()}
          </div>
          <button
            type="button"
            disabled={submitDisabled}
            className={
              submitDisabled
                ? css(styles.TradeModule_disabledSubmitButton)
                : css(styles.TradeModule_submitButton)
            }
            onClick={onSubmitTrade}
          >
            {isFetchingOrderData ? 'Fetching Order Details...' : 'Trade Now'}
          </button>
        </div>

        <div className={css(styles.TradeModule_orderSummaryContainer)}>
          <span className={css(styles.TradeModule_orderSummaryTitle)}>Order Details</span>
          <div className={css(styles.TradeModule_orderSummaryRow)}>
            <span className={css(styles.TradeModule_orderSummaryFirstCell)}>From</span>
            <span className={css(styles.TradeModule_orderSummaryMiddleCell)}>
              {_.isEmpty(orderData) ? '-' : `${fromAmount} ${fromSymbol}`}
            </span>
            <span className={css(styles.TradeModule_orderSummaryLastCell)}>
              {_.isEmpty(orderData) ? '-' : fromTokenPriceUsd}
            </span>
          </div>
          <div className={css(styles.TradeModule_orderSummaryRow)}>
            <span className={css(styles.TradeModule_orderSummaryFirstCell)}>To</span>
            <span className={css(styles.TradeModule_orderSummaryMiddleCell)}>
              {_.isEmpty(orderData) ? '-' : `${toAmount} ${toSymbol}`}
            </span>
            <span className={css(styles.TradeModule_orderSummaryLastCell)}>
              {_.isEmpty(orderData) ? '-' : toTokenPriceUsd}
            </span>
          </div>
          <div className={css(styles.TradeModule_orderSummaryRow)}>
            <span className={css(styles.TradeModule_orderSummaryFirstCell)}>Price Impact</span>
            <span className={css(styles.TradeModule_orderSummaryMiddleCell)} />
            <span className={css(styles.TradeModule_orderSummaryLastCell)}>{slippage || '-'}</span>
          </div>
          <div className={css(styles.TradeModule_orderSummaryRow)}>
            <span className={css(styles.TradeModule_orderSummaryFirstCell)}>Gas</span>
            <span className={css(styles.TradeModule_orderSummaryMiddleCell)}>
              {gasCostsEth || '-'}
            </span>
            <span className={css(styles.TradeModule_orderSummaryLastCell)}>
              {gasCostUsd || '-'}
            </span>
          </div>
        </div>
      </Container>
    );
  }
}
export default withTranslation('components')(TradeModule);
