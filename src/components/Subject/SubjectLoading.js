import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const SubjectLoading = ({ error }) => {
  if (error) {
    return (
      <Typography>SubjectLoading - Something went wrong while trying to load the page</Typography>
    );
  }
  return null;
};

SubjectLoading.propTypes = {
  error: PropTypes.object,
  // isLoading: PropTypes.bool, TODO put a content loader
};

export default SubjectLoading;
