import React from 'react';
import PropTypes from 'prop-types';

const LoadingPage = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Something went worng while trying to load the page =/
        <br />
        <p>{error}</p>
      </div>
    );
  }
  return null;
};

LoadingPage.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default LoadingPage;
