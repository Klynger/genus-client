import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { createGrade } from '../../actions/grade';
import { defaultDialogBreakpoints } from '../utils/helpers';
import { capitalize } from '@material-ui/core/utils/helpers';
import { DefaultDialogTransition } from '../utils/SharedComponents';
import {
  Input,
  Button,
  Dialog,
  withWidth,
  InputLabel,
  withStyles,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormHelperText,
  withMobileDialog,
} from '@material-ui/core';

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  gradeForm: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const GradeCreateDialog = ({
  classes,
  errors,
  fullScreen,
  handleChange,
  handleReset,
  handleSubmit,
  isSubmitting,
  values,
  open,
  onClose,
  touched,
  width,
}) => (
  <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={onClose}
    TransitionComponent={DefaultDialogTransition}
    onBackdropClick={handleReset}
    classes={{
      paper: classes[`dialogRoot${capitalize(width)}`],
    }}
  >
    <DialogTitle>Série</DialogTitle>
    <DialogContent>
      <Form className={classes.gradeForm}>
        <FormControl
          className={classes.formControl}
          error={touched.name && errors.name !== undefined}
        >
          <InputLabel htmlFor="name">Nome </InputLabel>
          <Input name="name" value={values.name} onChange={handleChange} />
          {touched.name && errors.name && (
            <FormHelperText id="grade__name-error-text">{errors.name}</FormHelperText>
          )}
        </FormControl>
      </Form>
      <DialogActions>
        <Button
          color="primary"
          disabled={isSubmitting}
          onClick={() => {
            onClose();
            handleReset();
          }}
        >
          Cancelar
        </Button>
        <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>
          Criar
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

GradeCreateDialog.defaultProps = {
  open: false,
};

GradeCreateDialog.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }),
  fullScreen: PropTypes.bool,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }),
  values: PropTypes.shape({
    name: PropTypes.string,
  }),
  width: PropTypes.string.isRequired,
};

function mapStateToProps({ institution }) {
  const { byId, selectedInstitution } = institution;
  return {
    institution: byId[selectedInstitution],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveGrade: newGrade => dispatch(createGrade(newGrade)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(
    withWidth()(
      withMobileDialog({
        breakpoint: 'xs',
      })(
        withRouter(
          withFormik({
            mapPropsToValues({ name }) {
              return {
                name: name || '',
              };
            },
            validationSchema: Yup.object().shape({
              name: Yup.string().required('Nome da disciplina é obrigatorio'),
            }),
            handleSubmit(values, { setSubmitting, props }) {
              // TODO
              const input = {
                institutionId: props.institution.id,
                name: values.name,
              };

              props
                .saveGrade(input)
                .then(() => {
                  props.onClose();
                  setSubmitting(false);
                })
                .catch(() => {
                  // TODO
                  setSubmitting(false);
                });
            },
            enableReinitialize: true,
          })(GradeCreateDialog),
        ),
      ),
    ),
  ),
);
