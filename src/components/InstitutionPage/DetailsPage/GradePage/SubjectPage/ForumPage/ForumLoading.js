import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ForumLoading = ({ error }) => {
  if (error) {
    return (
      <Typography>ForumLoading - Something went wrong while trying to load the page</Typography>
    );
  }
  return null;
};

ForumLoading.propTypes = {
  error: PropTypes.object,
  // isLoading: PropTypes.bool, TODO put a content loader
};

export default ForumLoading;
