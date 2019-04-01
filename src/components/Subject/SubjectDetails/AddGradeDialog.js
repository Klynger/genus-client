import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewGradesList from './NewGradesList';
import React, { Fragment, Component } from 'react';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import ProgressButton from '../../shared/ProgressButton';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import {
  Input,
  Button,
  Dialog,
  withStyles,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormHelperText,
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
      hasError: false,
      name: '',
      isSubmitting: false,
    };
  }

  handleChangeEvaluationValue = (value, userId) => {
    let error = false;
    let hasError = false;
    if (value < 0 || value > 10 || value === '') {
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
    this.setState({ name: e.target.true });
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.setState({ isSubmitting: true });
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

    const { studentsData, hasError, name, isSubmitting } = this.state;

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
                <FormControl className={classes.formControl} error>
                  <InputLabel htmlFor="name">Nome da Avaliação</InputLabel>
                  <Input name="name" onChange={this.handleNameChange} />
                  {(!name || name.length === 0) && (
                    <FormHelperText id="subject__name-error-text">
                      Uma avaliação deve ter um nome.
                    </FormHelperText>
                  )}
                </FormControl>
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
                disabled={hasError || !name || name.length === 0}
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
  fullScreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  subject: PropTypes.object.isRequired,
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function mapDispatchToProps() {
  return {};
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withMobileDialog({
    breakpoint: 'xs',
  })(withStyles(styles, { withTheme: true })(AddGradeDialog)),
);
