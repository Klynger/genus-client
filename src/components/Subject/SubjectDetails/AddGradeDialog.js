import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewGradesList from './NewGradesList';
import React, { Fragment, Component } from 'react';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import ProgressButton from '../../shared/ProgressButton';
import { capitalize } from '@material-ui/core/utils/helpers';
import { createEvaluation } from '../../../actions/evaluation';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import {
  Button,
  Dialog,
  TextField,
  withStyles,
  DialogTitle,
  DialogActions,
  DialogContent,
  withMobileDialog,
} from '@material-ui/core';

const styles = {
  ...defaultDialogBreakpoints(),
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
};

class AddGradeDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsData: props.subject.students.map(student => {
        const output = {
          id: student.id,
          username: student.username,
          result: 0,
          error: false,
        };

        return output;
      }),
      evaluation: {
        name: '',
        weight: 1,
      },
      errors: {
        name: true,
        weight: false,
      },
      hasError: false,
      evaluationName: '',
      isSubmitting: false,
    };
  }

  handleChangeEvaluationValue = (value, userId) => {
    let error = false;
    let hasError = false;
    if (Number(value) < 0 || Number(value) > 10 || value === '') {
      error = true;
      hasError = true;
    }
    this.setState(({ studentsData }) => ({
      studentsData: studentsData.map(data => {
        if (data.id === userId) {
          return { ...data, result: value, error };
        }
        hasError = hasError || error;
        return data;
      }),
      hasError,
    }));
  };

  handleNameChange = e => {
    const { value } = e.target;
    this.setState(({ errors, evaluation }) => ({
      evaluation: {
        ...evaluation,
        name: e.target.value,
      },
      errors: {
        ...errors,
        name: !value,
      },
    }));
  };

  handleSubmit = e => {
    const { hasError, evaluation } = this.state;

    e.preventDefault();

    if (!hasError && evaluation.name) {
      const { studentsData } = this.state;
      const { createNewEvaluations } = this.props;

      const resultInputs = studentsData.map(({ id, result }) => ({
        studentId: id,
        result: Number(result),
      }));

      const evaluationInput = {
        ...evaluation,
        resultInputs,
      };

      this.setState({ isSubmitting: true });
      createNewEvaluations(evaluationInput).then(() => {
        window.location.reload();
      });
    }
  };

  render() {
    const {
      open,
      width,
      classes,
      onClose,
      subject: { students },
      fullScreen,
    } = this.props;

    const { studentsData, hasError, evaluation, evaluationName, isSubmitting, errors } = this.state;
    const evaluationNameError = !evaluationName || evaluationName.length === 0;

    return (
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={onClose}
        TransitionComponent={DefaultDialogTransition}
        classes={{
          paper: classes[`dialogRoot${capitalize(width)}`],
        }}
      >
        <DialogTitle>Adicionar Nova Prova</DialogTitle>
        {students && students.length > 0 ? (
          <Fragment>
            <DialogContent>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <TextField
                  value={evaluation.name}
                  label="Nome da Avaliação"
                  className={classes.formControl}
                  onChange={this.handleNameChange}
                  error={errors.name}
                  helperText={evaluationNameError && 'Uma avaliação deve ter um nome.'}
                />
              </form>
              <NewGradesList
                headTitle="Alunos"
                studentsData={studentsData}
                onEvaluationChange={this.handleChangeEvaluationValue}
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <ProgressButton
                color="primary"
                disabled={hasError || !evaluationName || evaluationName.length === 0}
                onClick={this.handleSubmit}
                showProgress={isSubmitting}
              >
                Salvar
              </ProgressButton>
            </DialogActions>
          </Fragment>
        ) : (
          <AddTeacherEmptyView onDialogCloseClick={onClose} />
        )}
      </Dialog>
    );
  }
}

AddGradeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  createNewEvaluations: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  subject: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    createNewEvaluations: evaluationInput => dispatch(createEvaluation(evaluationInput)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withMobileDialog({
    breakpoint: 'xs',
  })(withStyles(styles)(AddGradeDialog)),
);
