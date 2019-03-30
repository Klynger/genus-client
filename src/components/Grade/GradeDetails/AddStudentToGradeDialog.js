import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { Form, withFormik } from 'formik';
import ProgressButton from '../../shared/ProgressButton';
import SingleSearchField from '../../shared/SearchFields';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { addStudentToSubjectsInGrade } from '../../../actions/subject';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import AddUserDialogEmptyView from '../../shared/AddUserDialogEmptyView';
import {
  Dialog,
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
    minHeight: '150px',
  },
  gradeName: {
    color: theme.palette.primary.main,
  },
});

function buildOptionsForSearchField(students) {
  const options = [];
  for (let i = 0; i < students.length; i += 1) {
    const student = students[i];
    options.push({ value: student.id, label: student.username });
  }
  return options;
}

const AddStudentToGradeDialog = ({
  open,
  classes,
  errors,
  fullScreen,
  width,
  values,
  onClose,
  isSubmitting,
  handleSubmit,
  students,
  setFieldValue,
  setFieldTouched,
  grade,
  touched,
}) => {
  const options = buildOptionsForSearchField(students);

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
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
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
        studentId: Yup.string().required('Selecione um estudante.'),
      }),
    handleSubmit(values, { props, setSubmitting, resetForm }) {
      props
        .addStudent(values)
        .then(res => {
          if (res.data.data && res.data.data.addStudentToSubjectsInGrade) {
            props.onClose();
          }
          setSubmitting(false);
          resetForm();
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
