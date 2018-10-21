import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  withStyles,
  CircularProgress,
} from '@material-ui/core';

const styles = theme => ({
  spinner: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
});

const ProgressButton = ({
  classes, children, showProgress, ...buttonProps
}) => (
  <div className={classes.wrapper}>
    <Button {...buttonProps} disabled={showProgress}>
      {children}
    </Button>
    {showProgress
      && <CircularProgress size={24} className={classes.spinner} />}
  </div>
);

ProgressButton.defaultProps = {
  showProgress: false,
};

ProgressButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  showProgress: PropTypes.bool,
};

export default withStyles(styles)(ProgressButton);
