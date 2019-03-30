import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { Form, withFormik } from 'formik';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import ProgressButton from '../../shared/ProgressButton';
import SingleSearchField from '../../shared/SearchFields';
import { capitalize } from '@material-ui/core/utils/helpers';
import { addStudentToSubject } from '../../../actions/subject';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import {
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
    minHeight: '150px',
    overflow: 'hidden',
  },
};

function buildOptionsForSearchField(students) {
  const options = [];
  for (let i = 0; i < students.length; i += 1) {
    const student = students[i];
    options.push({ value: student.id, label: student.username });
  }
  return options;
}

const AddStudentDialog = ({
  classes,
  errors,
  fullScreen,
  handleSubmit,
  isSubmitting,
  onClose,
  open,
  students,
  setFieldValue,
  setFieldTouched,
  subject,
  touched,
  values,
  width,
}) => {
  const options = buildOptionsForSearchField(students);

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
      <DialogTitle>{subject.name}</DialogTitle>
      {students && students.length > 0 ? (
        <Fragment>
          <DialogContent>
            <Form className={classes.form}>
              <FormControl error={touched.studentId && Boolean(errors.studentId)}>
                <InputLabel htmlFor="add-student-dialog__student-id-field">Aluno</InputLabel>
                <SingleSearchField
                  name="studentId"
                  onBlur={setFieldTouched}
                  onChange={setFieldValue}
                  options={options}
                  value={values.studentId}
                  error={errors.studentId}
                  touched={touched.studentId}
                  placeholder="Selecione um estudante"
                />
              </FormControl>
            </Form>
            {errors.requestError && (
              <FormHelperText error={Boolean(errors.requestError)}>
                {errors.requestError}
              </FormHelperText>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <ProgressButton color="primary" onClick={handleSubmit} showProgress={isSubmitting}>
              Adicionar
            </ProgressButton>
          </DialogActions>
        </Fragment>
      ) : (
        <AddTeacherEmptyView onDialogCloseClick={onClose} />
      )}
    </Dialog>
  );
};

AddStudentDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    requestError: PropTypes.string,
    studentId: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
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
            studentId: '',
            subjectId: id,
          };
        },
        validationSchema: () => {
          return Yup.object().shape({
            studentId: Yup.string().required('Selecione um estudante.'),
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
                    studentId: '',
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
      })(AddStudentDialog),
    ),
  ),
);
