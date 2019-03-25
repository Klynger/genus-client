import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { Form, withFormik } from 'formik';
import NewGradesList from './NewGradesList';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import ProgressButton from '../../shared/ProgressButton';
import { capitalize } from '@material-ui/core/utils/helpers';
import { addStudentToSubject } from '../../../actions/subject';
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

const NO_STUDENT_SELECTED = '-1';

const AddGradeDialog = ({
  classes,
  errors,
  fullScreen,
  handleChange,
  handleSubmit,
  isSubmitting,
  onClose,
  open,
  students,
  subject,
  touched,
  width,
}) => {
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
            <Form className={classes.form}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name">Nome da Avaliação</InputLabel>
                <Input name="name" onChange={handleChange} />
                {touched.name && errors.name && (
                  <FormHelperText id="subject__name-error-text">{errors.name}</FormHelperText>
                )}
              </FormControl>
            </Form>
            <NewGradesList users={subject.students} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <ProgressButton color="primary" onClick={handleSubmit} showProgress={isSubmitting}>
              Salvar
            </ProgressButton>
          </DialogActions>
        </Fragment>
      ) : (
        <AddTeacherEmptyView onDialogCloseClick={onClose} />
      )}
    </Dialog>
  );
};

AddGradeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    requestError: PropTypes.string,
    studentId: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  students: PropTypes.array,
  subject: PropTypes.object.isRequired,
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  touched: PropTypes.shape({
    studentId: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    studentId: PropTypes.string.isRequired,
    subjectId: PropTypes.string.isRequired,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function mapStateToProps({ institution, user }) {
  const { selectedInstitution } = institution;
  if (institution.byId[selectedInstitution]) {
    let students = [];
    if (institution.byId[selectedInstitution].students) {
      students = institution.byId[selectedInstitution].students.map(id => user.byId[id]);
    }

    return { students };
  }

  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addStudent: input => dispatch(addStudentToSubject(input)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withMobileDialog({
    breakpoint: 'xs',
  })(
    withStyles(styles, { withTheme: true })(
      withFormik({
        mapPropsToValues({ subject: { id } }) {
          return {
            studentId: NO_STUDENT_SELECTED,
            subjectId: id,
          };
        },
        validationSchema: () => {
          return Yup.object().shape({
            studentId: Yup.string().matches(
              new RegExp(`[^${NO_STUDENT_SELECTED}]`),
              'Selecione um aluno.',
            ),
          });
        },
        handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
          props
            .addStudent(values)
            .then(res => {
              let callResetForm = false;
              if (res.data.data && res.data.data.addStudentToSubject) {
                props.onClose();
                callResetForm = true;
              } else {
                setErrors({ requestError: 'Algo de errado aconteceu. Tente Novamente' });
              }
              setTimeout(() => {
                if (callResetForm) {
                  resetForm({
                    studentId: NO_STUDENT_SELECTED,
                    subjectId: props.subject.id,
                  });
                }
              }, props.theme.transitions.duration.leavingScreen);
            })
            .catch(() => {
              setTimeout(() => {
                setSubmitting(false);
              }, props.theme.transitions.duration.leavingScreen);
            });
        },
      })(AddGradeDialog),
    ),
  ),
);
