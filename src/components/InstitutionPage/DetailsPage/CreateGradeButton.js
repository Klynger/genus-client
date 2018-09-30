import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
  createGradeButtonRoot: {
    borderRadius: 5,
  },
  createGradeButtonActionArea: {
    height: '100%',
    width: '100%',
  },
  createGradeButtonContent: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: `calc(100% - ${theme.spacing.unit * 4}px)`,
  },
  createGradeButtonIcon: {
    height: 70,
    width: 70,
  },
});

const CreateGradeButton = ({ classes, onClick }) => (
  <IconButton
    classes={{ root: classes.createGradeButtonRoot }}
    color="secondary"
    onClick={onClick}
  >
    <AddCircleIcon className={classes.createGradeButtonIcon} />
  </IconButton>
);

CreateGradeButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

CreateGradeButton.defaultProps = {
  onClick: () => {},
};

export default withStyles(styles)(CreateGradeButton);
