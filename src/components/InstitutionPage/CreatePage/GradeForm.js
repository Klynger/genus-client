import React from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import {
  Button,
  Dialog, DialogTitle,
  DialogContent, DialogActions,
  FormControl, FormHelperText,
  Input, InputLabel,
  withStyles, withMobileDialog,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const styles = theme => ({
  dialogContent: {
    minWidth: '25vw',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  header: {
    backgroundColor: theme.palette.secondary.main,
  },
});

const GradeForm = ({ classes, errors, fullScreen, handleChange, handleReset, handleSubmit,
  isSubmitting, values, open, onClose, touched }) => (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      onBackdropClick={handleReset}
    >
    <DialogTitle className={classes.header}>
        Série
    </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <StyledForm>
          <FormControl
            className={classes.formControl}
            error={touched.name && errors.name !== undefined}
          >
            <InputLabel htmlFor="name">Nome </InputLabel>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {touched.name && errors.name &&
              <FormHelperText id="grade__name-error-text">{errors.name}</FormHelperText>}
          </FormControl>
        </StyledForm>
        <DialogActions>
          <Button
            color="primary"
            disabled={isSubmitting}
            onClick={() => { onClose(); handleReset(); }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Criar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

GradeForm.defaultProps = {
  open: false,
};

GradeForm.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  fullScreen: PropTypes.bool,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }),
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default withStyles(styles)(withMobileDialog()(withRouter(withFormik({
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
    setSubmitting(false);
    props.onClose();
  },
  enableReinitialize: true,
})(GradeForm))));
