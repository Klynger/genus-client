import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  gridButtonRoot: {
    borderRadius: 5,
  },
  gridButtonIcon: {
    height: 70,
    width: 70,
  },
});

const GridButton = ({ classes, onClick, Icon }) => (
  <IconButton
    classes={{ root: classes.gridButtonRoot }}
    color="secondary"
    onClick={onClick}
  >
    <Icon className={classes.gridButtonIcon} />
  </IconButton>
);

GridButton.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(GridButton);
