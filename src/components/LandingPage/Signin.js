import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  Button, Dialog, DialogTitle,
  DialogContent, DialogActions,
  FormControl, FormHelperText,
  Input, InputLabel,
  withMobileDialog
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';


import { Form, withFormik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

const StyledForm = styled(Form) `
  display: flex;
  flex-direction: column;
`

const Transition = props => {
  return <Slide direction='down' in={true} {...props} />;
}

const styles = theme => ({
  dialogContent: {
    minWidth: '30vw',
  },
  formControl: {
    marginBottom: theme.spacing.unit
  },
  signinHeader: {
    backgroundColor: theme.palette.secondary.main
  }
});

const Signin = ({ classes, errors, handleChange, handleReset, handleSubmit, isSubmitting, values, open, onClose, touched }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      onBackdropClick={handleReset}
    >
      <DialogTitle id="Sigin-dialog" className={classes.signinHeader}>
        {"Sign in"}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <StyledForm>
          <FormControl
            className={classes.formControl}
            error={errors.email !== undefined}
          >
            <InputLabel>{"Email: "}</InputLabel>
            <Input
              name="email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
            />
            {touched.email && errors.email &&
              <FormHelperText id="signin__email-error-text">{errors.email}</FormHelperText>}
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={touched.password && errors.password !== undefined}
          >
            <InputLabel htmlFor="signin_password">Password</InputLabel>
            <Input
              id="sigin__password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password &&
              <FormHelperText id="signin__password-error-text">{errors.password}</FormHelperText>}
          </FormControl>
        </StyledForm>
        <DialogActions>
          <Button color="primary" disabled={isSubmitting} onClick={onClose}>
            Cancel
            </Button>
          <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>
            Login
            </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

Signin.defaultProps = {
  open: false,
};

Signin.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(withMobileDialog()(withRouter(withFormik({
  mapPropsToValues({ email }) {
    return {
      email: email || '',
      password: ''
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be 6 charcters or longer').required('Password is required')
  }),
  handleSubmit(values, { setSubmitting, props }) {
    props.history.push('/');
  },
  enableReinitialize: true
})(Signin))))
