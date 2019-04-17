import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import React, { Component, Fragment } from 'react';
import SearchField from '../../shared/SearchFields';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import { capitalize } from '@material-ui/core/utils/helpers';
import { addTeacherToSubject } from '../../../actions/subject';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import {
  Dialog,
  Button,
  withStyles,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  withMobileDialog,
} from '@material-ui/core';

const styles = () => ({
  ...defaultDialogBreakpoints(),
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    minHeight: '150px',
    overflow: 'hidden',
  },
});

const NO_TEACHER_SELECTED = '-1';

class AddTeacherDialog extends Component {
  buildOptionsForSearchField = () => {
    const options = [];
    for (let i = 0; i < this.props.teachers.length; i += 1) {
      const teacher = this.props.teachers[i];
      options.push({ value: teacher.id, label: teacher.username });
    }
    return options;
  };

  render() {
    const {
      open,
      width,
      errors,
      values,
      classes,
      onClose,
      subject,
      touched,
      teachers,
      fullScreen,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
    } = this.props;

    const options = this.buildOptionsForSearchField();

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
        {teachers.length === 0 ? (
          <AddTeacherEmptyView onDialogCloseClick={onClose} />
        ) : (
          <Fragment>
            <DialogContent>
              <Form className={classes.form}>
                <FormControl
                  className={classes.formControl}
                  error={touched.teacherId && errors.teacherId !== undefined}
                >
                  <SearchField
                    name="teacherId"
                    onBlur={setFieldTouched}
                    onChange={setFieldValue}
                    options={options}
                    value={values.teacherId}
                    error={errors.teacherId}
                    touched={touched.teacherId}
                    placeholder="Selecione um professor"
                  />
                </FormControl>
              </Form>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Adicionar
              </Button>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>
    );
  }
}

AddTeacherDialog.defaultProps = {
  open: false,
  teachers: [],
};

AddTeacherDialog.propTypes = {
  addTeacher: PropTypes.func.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    subjectId: PropTypes.string,
    teacherId: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  subject: PropTypes.object.isRequired,
  teachers: PropTypes.array,
  touched: PropTypes.shape({
    subjectId: PropTypes.bool,
    teacherId: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    subjectId: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function mapToProps({ institution, user }) {
  const { selectedInstitution } = institution;
  if (institution.byId[selectedInstitution]) {
    let teachers;
    if (institution.byId[selectedInstitution].teachers) {
      teachers = institution.byId[selectedInstitution].teachers.map(id => user.byId[id]);
    } else {
      teachers = institution.byId[selectedInstitution].teacherList.map(id => user.byId[id]);
    }
    return { teachers };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addTeacher: input => dispatch(addTeacherToSubject(input)),
  };
}

export default connect(
  mapToProps,
  mapDispatchToProps,
)(
  withFormik({
    mapPropsToValues({ subject: { id } }) {
      return {
        subjectId: id,
        teacherId: NO_TEACHER_SELECTED,
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        teacherId: Yup.string().required('Selecione um professor.'),
      }),
    handleSubmit(values, { props }) {
      props
        .addTeacher(values)
        .then(() => {
          props.onClose();
        })
        .catch(() => {
          // TODO
        });
    },
  })(
    withMobileDialog({
      breakpoint: 'xs',
    })(withStyles(styles)(AddTeacherDialog)),
  ),
);
