import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import { editEvaluationResult } from '../../../actions/evaluationResult';
import {
  Button,
  Dialog,
  withStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
  withMobileDialog,
} from '@material-ui/core';

const styles = theme => ({
  username: {
    color: theme.palette.primary.main,
  },
});

class EditEvaluationDialog extends Component {
  constructor(props) {
    super(props);
    const { result } = props.evaluationResult;
    this.state = {
      result,
      hasError: result < 0 || result > 10,
      isSubmitting: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ result: this.props.evaluationResult.result });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { result, hasError } = this.state;
    if (!hasError) {
      const { evaluationResult, editResult } = this.props;
      const { id } = evaluationResult;
      const requestOutput = {
        resultId: id,
        newResult: Number(result),
      };
      this.setState({ isSubmitting: true });
      editResult(requestOutput).then(res => {
        if (res.data.data && res.data.data.updateEvaluationResults) {
          window.location.reload();
        } else {
          // TODO error handler
        }
      });
    }
  };

  handleResultChange = e => {
    const { value } = e.target;
    let hasError = false;
    if (Number(value) < 0 || Number(value) > 10) {
      hasError = true;
    }
    this.setState({ result: value, hasError });
  };

  render() {
    const { classes, open, onClose, student, evaluationResult } = this.props;
    const { result, hasError, isSubmitting } = this.state;

    return (
      <Dialog open={open} onClose={onClose} TransitionComponent={DefaultDialogTransition}>
        <DialogTitle>
          Alterar nota de <span className={classes.username}>{student.username}</span>
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <CustomTextField
              label="Nota"
              name="result"
              type="number"
              value={result}
              error={hasError}
              showHelperText={hasError}
              className={classes.formControl}
              onChange={this.handleResultChange}
              id="edit-evaluation-result-dialog__result-field"
              helperText="A nota deve ser um valor entre 0 e 10."
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <ProgressButton
            type="submit"
            color="primary"
            disabled={hasError || Number(result) === evaluationResult.result}
            onClick={this.handleSubmit}
            showProgress={isSubmitting}
          >
            Salvar
          </ProgressButton>
        </DialogActions>
      </Dialog>
    );
  }
}

EditEvaluationDialog.defaultProps = {
  open: false,
};

EditEvaluationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  editResult: PropTypes.func.isRequired,
  evaluationResult: PropTypes.shape({
    id: PropTypes.string.isRequired,
    result: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    editResult: input => dispatch(editEvaluationResult(input)),
  };
}

export default withMobileDialog({
  breakpoint: 'xs',
})(
  withStyles(styles)(
    connect(
      null,
      mapDispatchToProps,
    )(EditEvaluationDialog),
  ),
);
