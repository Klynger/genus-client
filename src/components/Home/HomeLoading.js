import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const HomeLoading = ({ error }) => {
  if (error) {
    return (
      <Typography>HomeLoading - Something went wrong while trying to load the page</Typography>
    );
  }
  return null;
};

HomeLoading.propTypes = {
  error: PropTypes.object,
  // isLoading: PropTypes.bool, TODO put a content loader
};

export default HomeLoading;
