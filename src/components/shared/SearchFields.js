/* eslint-disable react/prop-types, react/jsx-handler-names */

import Select from 'react-select';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  input: {
    display: 'flex',
    padding: 0,
  },
});

const customTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#ff5722', // orange
    primary25: '#f7a185', // light-orange
    primary50: '#ff5722', // orange
    primary75: '#ff5722', // orange
  },
});

class SingleSearchField extends Component {
  handleChange = data => {
    if (data) {
      this.props.onChange(this.props.name, data.value);
    } else {
      this.props.onChange(this.props.name, '');
    }
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div style={{ margin: '1rem 0' }}>
        <Select
          isClearable
          isSearchable
          arrowRenderer={null}
          theme={customTheme}
          openMenuOnFocus={false}
          openMenuOnClick={false}
          maxMenuHeight={150}
          placeholder={this.props.placeholder}
          name={this.props.name}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          options={this.props.options}
          noOptionsMessage={() => {
            return 'Nenhum resultado encontrado.';
          }}
        />
        {this.props.error && this.props.touched && (
          <div style={{ color: 'red', marginTop: '1rem', marginLeft: '0.2rem' }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

SingleSearchField.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  touched: PropTypes.bool,
};

export default withStyles(styles)(SingleSearchField);
