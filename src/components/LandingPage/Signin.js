import React from 'react';
import PropTypes from 'prop-types';

const Signin = ({ open }) => {
  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      Signin works
    </div>
  );
};

Signin.defaultProps = {
  open: false,
};

Signin.propTypes = {
  open: PropTypes.bool,
};

export default Signin;
