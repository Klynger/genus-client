import React from 'react';
import PropTypes from 'prop-types';
import ProgressButton from '../../shared/ProgressButton';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import { Dialog, Button, DialogTitle, DialogActions, withStyles } from '@material-ui/core';

const styles = theme => ({
  primaryColorText: {
    color: theme.palette.primary.main,
  },
});

const RemoveStudentFromSubjectDialog = props => {
  const { open, onClose, student, classes, onConfirmation, isSubmitting } = props;
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={DefaultDialogTransition}>
      <DialogTitle>
        Remover <span className={classes.primaryColorText}>{student.username}</span> da disciplina ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <ProgressButton color="primary" onClick={onConfirmation} showProgress={isSubmitting}>
          Confirmar
        </ProgressButton>
      </DialogActions>
    </Dialog>
  );
};

RemoveStudentFromSubjectDialog.defaultProps = {
  isSubmitting: false,
  open: false,
  student: {},
};

RemoveStudentFromSubjectDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func.isRequired,
  open: PropTypes.bool,
  student: PropTypes.object,
};

export default withStyles(styles)(RemoveStudentFromSubjectDialog);
