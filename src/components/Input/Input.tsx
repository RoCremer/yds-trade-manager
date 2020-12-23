import React, { createRef, PureComponent } from 'react';
import { css, StyleSheet } from 'aphrodite';

import { Button, Text } from '..';
import { COLORS, INPUT_TYPES, STYLES, WINDOW_DIMENSIONS } from '@constants/index';
import { IAddon, Addons } from '@typings/index';

const { monoFont, sansSerifFont, fontWeights } = STYLES;
const { MOBILE_MEDIA_QUERY } = WINDOW_DIMENSIONS;

const styles = StyleSheet.create<any>({
  input: {
    borderRadius: '5px',
    fontWeight: fontWeights.regular,
    width: '100%',
    margin: '0',
    transition: '0.2s',
  },
  inputContainer: {
    position: 'relative',
    [MOBILE_MEDIA_QUERY]: {
      width: 'auto',
    },
  },
  inputAddon: {
    fontFamily: monoFont,
    fontWeight: fontWeights.regular,
    fontSize: '16px',
  },
  inputAddonMarginRight: {
    marginRight: '16px',
  },
  inputLabelContainer: {
    position: 'absolute',
    right: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  // Widths
  threeQuarters: { width: '75%' },
  half: { width: '50%' },
  quarter: { width: '25%' },
});

export interface IInputProps {
  readonly error?: boolean;
  readonly isFocus?: boolean;
  readonly isDisabled?: boolean;
  readonly inputMode?: string;
  readonly borderColor?: string;
  readonly borderWidth?: string;
  readonly fontStyle?: string;
  readonly fontColor?: string;
  readonly focusColor?: string;
  readonly padding?: string;
  readonly placeholder?: string;
  readonly pattern?: string;
  readonly value?: string;
  readonly step?: string;
  readonly type?: string;
  readonly width?: string;
  readonly addOns?: Addons;
  readonly innerStyles?: any;
  readonly marginStyle?: any;
  readonly placeholderFontColor?: string;
  readonly children?: React.ReactNode[];
  readonly onChange?: (...args: any[]) => any;
  readonly textAlign?: string;
  readonly customStyles?: any;
}

class Input extends PureComponent<IInputProps> {
  private inputRef = createRef<HTMLInputElement>();

  public static get defaultProps() {
    return {
      error: false,
      isFocus: false,
      isDisabled: false,
      inputMode: '',
      borderWidth: '1px',
      borderColor: COLORS.gray,
      focusColor: COLORS.blue,
      fontColor: 'black',
      fontStyle: '',
      padding: '28px',
      placeholder: '',
      placeholderStyle: {},
      step: undefined as any,
      type: INPUT_TYPES.TEXT,
      value: '',
      width: '',
      pattern: '',
      textAlign: 'left',
      addOns: [{}],
      onChange: () => {},
      customStyles: {},
    };
  }

  public static renderButton(addon: IAddon, marginRight: string) {
    const { color = 'gray', text, onClick = () => {}, customStyles } = addon;
    return (
      <Button
        className={css(styles.inputAddon, marginRight, customStyles ? customStyles : null)}
        color={color}
        key={`num-input-btn-${text}`}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  }

  public static renderLabel(addon: IAddon, marginRight: string) {
    const { color = 'blue', text, type = 'regular', customStyles } = addon;
    return (
      <Text
        className={css(styles.inputAddon, marginRight, customStyles ? customStyles : null)}
        color={color}
        key={`num-input-label-${text}`}
        tag="span"
        type={type}
      >
        {text}
      </Text>
    );
  }

  public static renderElement(addon: IAddon) {
    return addon.element;
  }

  public static handleStyles(
    borderWidth: string,
    error: any,
    fontColor: string,
    fontStyle: string,
    placeholderFontColor: string,
    focusColor: string,
    borderColor: string,
    padding: string,
    textAlign: string,
    customStyles: any,
  ) {
    return StyleSheet.create({
      input: {
        ...styles.input,
        border:
          borderWidth === '0px'
            ? 'none'
            : `${borderWidth} solid ${error ? COLORS.red : borderColor}`,
        fontFamily: fontStyle === 'mono' ? monoFont : sansSerifFont,
        ':focus': {
          border:
            borderWidth === '0px'
              ? 'none'
              : `${borderWidth} solid ${error ? COLORS.red : focusColor}`,
        },
        '::placeholder': {
          color: placeholderFontColor ? placeholderFontColor : COLORS.darkGray,
        },
        color: fontColor ? fontColor : COLORS.black,
        padding: padding,
        textAlign: textAlign,
        ...customStyles,
      },
    });
  }

  public componentDidMount() {
    const { isFocus } = this.props;
    if (isFocus && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  public onChangeInput = (e: any) => {
    const { onChange } = this.props;

    onChange(e, this.inputRef);
  };

  public render() {
    const {
      addOns,
      borderWidth,
      children,
      error,
      inputMode,
      borderColor,
      focusColor,
      fontColor,
      fontStyle,
      isDisabled,
      placeholder,
      step,
      type,
      value,
      width,
      padding,
      pattern,
      textAlign,
      innerStyles,
      marginStyle,
      placeholderFontColor,
      customStyles,
    } = this.props;
    const inputStyle = Input.handleStyles(
      borderWidth,
      error,
      fontColor,
      fontStyle,
      placeholderFontColor,
      focusColor,
      borderColor,
      padding,
      textAlign,
      customStyles,
    );
    const widthStyle = styles[width];

    return (
      <div
        className={css(styles.inputContainer, widthStyle)}
        style={{ margin: marginStyle ? marginStyle : '30px auto' }}
      >
        <div style={innerStyles ? innerStyles : {}}>
          <input
            className={css(styles.input, inputStyle.input)}
            disabled={isDisabled}
            min={type === 'number' ? '0' : null}
            onChange={e => this.onChangeInput(e)}
            placeholder={placeholder}
            inputMode={inputMode ? inputMode : null}
            pattern={pattern ? pattern : null}
            ref={this.inputRef}
            value={value}
            step={step}
            type={type}
          />
        </div>
        {children}
        <div className={css(styles.inputLabelContainer)}>
          {addOns.length
            ? addOns.map((addOn: IAddon, i: number) => {
                // If there's more than 1 addOn, and this element isn't the last element
                const hasMarginRight = addOns.length > 1 && i !== addOns.length - 1;
                const marginRight = hasMarginRight ? styles.inputAddonMarginRight : null;
                if (addOn.type === 'label') {
                  return Input.renderLabel(addOn, marginRight);
                } else if (addOn.type === 'button') {
                  return Input.renderButton(addOn, marginRight);
                } else if (addOn.type === 'element') {
                  return Input.renderElement(addOn);
                }
                return null;
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Input;
