import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { Form, withFormik } from 'formik';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import ProgressButton from '../../utils/ProgressButton';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { addStudentToSubject } from '../../../actions/subject';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import {
  Zoom,
  Input,
  Button,
  Dialog,
  Select,
  MenuItem,
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

const AddStudentDialog = ({
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
  values,
  width,
}) => (
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
              <Select
                value={values.studentId}
                onChange={handleChange}
                input={<Input name="studentId" id="add-student-dialog__student-id-field" />}
              >
                <MenuItem value={NO_STUDENT_SELECTED} disabled>
                  Selecione um Aluno
                </MenuItem>
                {students.map(({ id, name, username }) => (
                  <MenuItem key={id} value={id}>
                    {name || username}
                  </MenuItem>
                ))}
              </Select>
              {touched.studentId &&
                Boolean(errors.studentId) && (
                  <Zoom in>
                    <FormHelperText>{errors.studentId}</FormHelperText>
                  </Zoom>
                )}
            </FormControl>
          </Form>
          {errors.requestError && (
            <FormHelperText error={Boolean(errors.requestError)}>
              {errors.requestError}
            </FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
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

AddStudentDialog.propTypes = {
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
          setSubmitting(false);

          if (res.data.data && res.data.data.addStudentToSubject) {
            props.onClose();
            resetForm({
              studentId: NO_STUDENT_SELECTED,
              subjectId: props.subject.id,
            });
          } else {
            setErrors({ requestError: 'Algo de errado aconteceu. Tente Novamente' });
          }
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  })(
    withMobileDialog({
      breakpoint: 'xs',
    })(withStyles(styles)(AddStudentDialog)),
  ),
);
