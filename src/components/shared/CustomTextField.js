import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Input,
  Select,
  InputLabel,
  FilledInput,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

class CustomTextField extends Component {
  constructor(props) {
    super(props);
    this.labelRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.variant === 'outlined') {
      this.labelNode = ReactDOM.findDOMNode(this.labelRef.current);
      this.forceUpdate();
    }
  }

  render() {
    const {
      id,
      name,
      rows,
      type,
      error,
      label,
      value,
      onBlur,
      select,
      rowsMax,
      variant,
      onFocus,
      children,
      inputRef,
      onChange,
      required,
      className,
      fullWidth,
      autoFocus,
      multiline,
      InputProps,
      inputProps,
      helperText,
      placeholder,
      SelectProps,
      autoComplete,
      defaultValue,
      showHelperText,
      InputLabelProps,
      FormHelperTextProps,
      OnEnterHelperTextTransition,
      ...other
    } = this.props;

    const InputMore = {};

    if (variant === 'outlined') {
      if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
        InputMore.notched = InputLabelProps.shrink;
      }

      InputMore.labelWidth = (this.labelNode && this.labelNode.offsetWidth) || 0;
    }

    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
    const InputComponent = variantComponent[variant];
    const InputElement = (
      <InputComponent
        id={id}
        name={name}
        type={type}
        rows={rows}
        value={value}
        onBlur={onBlur}
        rowsMax={rowsMax}
        onFocus={onFocus}
        inputRef={inputRef}
        onChange={onChange}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        multiline={multiline}
        inputProps={inputProps}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        {...InputMore}
        {...InputProps}
      />
    );

    return (
      <FormControl
        error={error}
        variant={variant}
        required={required}
        className={className}
        fullWidth={fullWidth}
        aria-describedby={helperTextId}
        {...other}
      >
        {label && (
          <InputLabel htmlFor={id} ref={this.labelRef} {...InputLabelProps}>
            {label}
          </InputLabel>
        )}
        {select ? (
          <Select value={value} {...SelectProps}>
            {children}
          </Select>
        ) : (
          InputElement
        )}
        {showHelperText &&
          helperText &&
          (OnEnterHelperTextTransition ? (
            <OnEnterHelperTextTransition in>
              <FormHelperText id={helperTextId} {...FormHelperTextProps}>
                {helperText}
              </FormHelperText>
            </OnEnterHelperTextTransition>
          ) : (
            <FormHelperText id={helperTextId} {...FormHelperTextProps}>
              {helperText}
            </FormHelperText>
          ))}
      </FormControl>
    );
  }
}

CustomTextField.defaultProps = {
  select: false,
  required: false,
  variant: 'standard',
  showHelperText: false,
};

CustomTextField.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  FormHelperTextProps: PropTypes.object,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.node,
  id: PropTypes.string,
  InputLabelProps: PropTypes.object,
  InputProps: PropTypes.object,
  inputProps: PropTypes.object,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  label: PropTypes.node,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  OnEnterHelperTextTransition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
    PropTypes.symbol,
  ]),
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  select: PropTypes.bool,
  SelectProps: PropTypes.object,
  showHelperText: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  ]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default CustomTextField;
