import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  progressLoading: {
    left: '50%',
    margin: 0,
    marginRight: '50%',
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const LoadingPage = ({ classes, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className={classes.progressLoading}>
        <CircularProgress color="secondary" thickness={4} size={60} />
      </div>
    );
  }

  if (error) {
    return <div>Something went worng while trying to load the page =/</div>;
  }
  return null;
};

LoadingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default withStyles(styles)(LoadingPage);
