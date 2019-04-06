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

class SearchField extends Component {
  handleSingleChange = data => {
    if (data) {
      this.props.onChange(this.props.name, data.value);
    } else {
      this.props.onChange(this.props.name, '');
    }
  };

  handleMultiChange = data => {
    if (data) {
      this.props.onChange(this.props.name, data.map(d => d.value));
    } else {
      this.props.onChange(this.props.name, []);
    }
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div style={{ margin: '1rem 0', overlflowY: 'visible' }}>
        <Select
          isClearable
          isSearchable
          isMulti={this.props.isMulti}
          arrowRenderer={null}
          theme={customTheme}
          openMenuOnFocus={false}
          openMenuOnClick={false}
          maxMenuHeight={150}
          placeholder={this.props.placeholder}
          name={this.props.name}
          onChange={this.props.isMulti ? this.handleMultiChange : this.handleSingleChange}
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

SearchField.propTypes = {
  error: PropTypes.string,
  isMulti: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  touched: PropTypes.bool,
};

export default withStyles(styles)(SearchField);
