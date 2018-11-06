import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import React, { Component, Fragment } from 'react';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import { capitalize } from '@material-ui/core/utils/helpers';
import { addTeacherToSubject } from '../../../actions/subject';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import {
  Zoom,
  Input,
  Dialog,
  Button,
  Select,
  MenuItem,
  InputLabel,
  withStyles,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormHelperText,
  withMobileDialog,
} from '@material-ui/core';

const styles = () => ({
  ...defaultDialogBreakpoints(),
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
});

class AddTeacherDialog extends Component {
  static NO_TEACHER_SELECTED = '-1';

  render() {
    const {
      open,
      subject,
      teachers,
      onClose,
      classes,
      width,
      fullScreen,
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
    } = this.props;
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
                  <InputLabel htmlFor="add-teacher-dialog__teacher-id-field">Professor</InputLabel>
                  <Select
                    value={values.teacherId}
                    onChange={handleChange}
                    input={<Input name="teacherId" id="add-teacher-dialog__teacher-id-field" />}
                  >
                    <MenuItem value={AddTeacherDialog.NO_TEACHER_SELECTED} disabled>
                      Selecione um professor
                    </MenuItem>
                    {teachers.map(({ id, name, username }) => (
                      <MenuItem key={id} value={id}>
                        {name || username}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.teacherId &&
                    errors.teacherId && (
                      <Zoom in>
                        <FormHelperText>{errors.teacherId}</FormHelperText>
                      </Zoom>
                    )}
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
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
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
        teacherId: AddTeacherDialog.NO_TEACHER_SELECTED,
      };
    },
    validationSchema: () => {
      return Yup.object().shape({
        teacherId: Yup.string().matches(
          new RegExp(`[^${AddTeacherDialog.NO_TEACHER_SELECTED}]`),
          'Selecione um professor.',
        ),
      });
    },
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
