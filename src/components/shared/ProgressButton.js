import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles, CircularProgress } from '@material-ui/core';

const styles = () => ({
  spinner: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
  },
  wrapper: {
    position: 'relative',
  },
});

const ProgressButton = ({ classes, children, showProgress, ...buttonProps }) => (
  <div className={classes.wrapper}>
    <Button {...buttonProps} disabled={showProgress}>
      {children}
    </Button>
    {showProgress && <CircularProgress size={24} className={classes.spinner} />}
  </div>
);

ProgressButton.defaultProps = {
  color: 'primary',
  showProgress: false,
};

ProgressButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  showProgress: PropTypes.bool,
};

export default withStyles(styles)(ProgressButton);
