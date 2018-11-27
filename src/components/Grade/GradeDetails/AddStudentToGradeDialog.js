import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { Form, withFormik } from 'formik';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { addStudentToSubjectsInGrade } from '../../../actions/subject';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import AddUserDialogEmptyView from '../../shared/AddUserDialogEmptyView';
import {
  Zoom,
  Dialog,
  MenuItem,
  withStyles,
  DialogTitle,
  DialogActions,
  DialogContent,
  withMobileDialog,
} from '@material-ui/core';

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  gradeName: {
    color: theme.palette.primary.main,
  },
});

const NO_STUDENT_SELECTED = '-1';

const AddStudentToGradeDialog = ({
  open,
  classes,
  errors,
  fullScreen,
  width,
  values,
  onClose,
  isSubmitting,
  handleChange,
  handleSubmit,
  students,
  grade,
  touched,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      TransitionComponent={DefaultDialogTransition}
      classes={{
        paper: classes[`dialogRoot${capitalize(width)}`],
      }}
    >
      <DialogTitle>
        Adicionar estudante a <span className={classes.gradeName}>{grade.name}</span>
      </DialogTitle>
      {students.length > 0 ? (
        <Fragment>
          <DialogContent>
            <Form className={classes.form}>
              <CustomTextField
                select
                name="studentId"
                label="Selecione um estudante"
                id="add-student-to-grade-dialog__student"
                className={classes.select}
                onChange={handleChange}
                value={values.studentId}
                helperText={errors.studentId}
                OnEnterHelperTextTransition={Zoom}
                error={Boolean(touched.studentId && errors.studentId)}
                showHelperText={Boolean(touched.studentId && errors.studentId)}
              >
                <MenuItem key={NO_STUDENT_SELECTED} value={NO_STUDENT_SELECTED}>
                  Escolha uma opção
                </MenuItem>
                {students.map(({ id, name, username }) => (
                  <MenuItem key={id} value={id}>
                    {name || username}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Form>
          </DialogContent>
          <DialogActions>
            <ProgressButton showProgress={isSubmitting} onClick={handleSubmit}>
              Adicionar
            </ProgressButton>
          </DialogActions>
        </Fragment>
      ) : (
        <AddUserDialogEmptyView onActionClick={onClose}>
          Não há estudantes cadastrados nessa instituição
        </AddUserDialogEmptyView>
      )}
    </Dialog>
  );
};

AddStudentToGradeDialog.defaultProps = {
  open: false,
  students: [],
};

AddStudentToGradeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    gradeId: PropTypes.string,
    studentId: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  grade: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      username: PropTypes.string,
    }),
  ),
  touched: PropTypes.shape({
    gradeId: PropTypes.bool,
    studentId: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    gradeId: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addStudent: input => dispatch(addStudentToSubjectsInGrade(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withFormik({
    mapPropsToValues({ grade: { id: gradeId } }) {
      return {
        studentId: '',
        gradeId,
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        studentId: Yup.string()
          .required('Selecione um estudante.')
          .matches(new RegExp(`[^${NO_STUDENT_SELECTED}]`), 'Selecione um estudante.'),
      }),
    handleSubmit(values, { props, setSubmitting }) {
      props
        .addStudent(values)
        .then(res => {
          if (res.data.data && res.data.data.addStudentToSubjectsInGrade) {
            props.onClose();
          }
          setSubmitting(false);
        })
        .catch(() => {
          // TODO
          setSubmitting(false);
        });
    },
  })(
    withMobileDialog({
      breakpoint: 'xs',
    })(withStyles(styles)(AddStudentToGradeDialog)),
  ),
);
