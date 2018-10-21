import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const UserLoading = ({ error }) => {
  if (error) {
    return (
      <Typography>
        UserLoading - Something went wrong while trying to load the page
      </Typography>
    );
  }
  return null;
};

UserLoading.propTypes = {
  error: PropTypes.object,
  // isLoading: PropTypes.bool, TODO put a content loader
};

export default UserLoading;
