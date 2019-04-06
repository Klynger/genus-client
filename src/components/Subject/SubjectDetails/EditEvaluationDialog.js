import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { requestGraphql } from '../../../utils/HTTPClient';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import { mutationEditEvaluation } from '../../../queryGenerators/evaluationMutations';
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
    const { result } = props.evaluation;
    this.state = {
      result,
      hasError: result < 0 || result > 10,
      isSubmitting: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ result: this.props.evaluation.result });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { result, hasError } = this.state;
    if (!hasError) {
      const { evaluation } = this.props;
      const { id, result: oldResult, ...restEvaluation } = evaluation;
      const output = {
        evaluationId: id,
        ...restEvaluation,
        result: Number(result),
      };
      this.setState({ isSubmitting: true });
      requestGraphql(mutationEditEvaluation(output), localStorage.getItem('token')).then(res => {
        if (res.data.data && res.data.data.editEvaluation) {
          window.location.reload();
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
    const { classes, open, onClose, student, evaluation } = this.props;
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
              id="edit-evaluation-dialog__result-field"
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
            disabled={hasError || Number(result) === evaluation.result}
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
  evaluation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    result: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default withMobileDialog({
  breakpoint: 'xs',
})(withStyles(styles)(EditEvaluationDialog));
