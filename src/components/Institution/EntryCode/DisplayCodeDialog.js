import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { DefaultDialogTransition } from '../../shared/SharedComponents';

const styles = () => ({
  displayCodeDialogRoot: {
    minWidth: 290,
  },
});

const DisplayCodeDialog = ({ classes, code, onClose, open }) => (
  <Dialog
    open={open}
    onClose={onClose}
    TransitionComponent={DefaultDialogTransition}
    classes={{ paper: classes.displayCodeDialogRoot }}
  >
    <DialogTitle>Código Gerado</DialogTitle>
    <DialogContent>{code}</DialogContent>
  </Dialog>
);

DisplayCodeDialog.defaultProps = {
  open: false,
};

DisplayCodeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  code: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default withStyles(styles)(DisplayCodeDialog);
