import {
  Button, Dialog, DialogTitle,
  DialogContent, DialogActions,
  FormControl, FormHelperText,
  Input, InputLabel,
  withMobileDialog, Slide,
  withStyles,
} from '@material-ui/core';
import { Form, withFormik } from 'formik';
import { requestGraphql } from '../utils/HTTPClient';
import loginQuery from '../../queryGenerators/user';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const Transition = props => {
  return <Slide direction="down" in {...props} />;
};

const styles = theme => ({
  dialogContent: {
    minWidth: '30vw',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  signinHeader: {
    backgroundColor: theme.palette.secondary.main,
  },
});

const Signin = ({ classes, errors, fullScreen, handleChange, handleReset, handleSubmit,
                  isSubmitting, values, open, onClose, touched }) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      onBackdropClick={handleReset}
    >
      <DialogTitle id="Sigin-dialog" className={classes.signinHeader}>
        Sign in
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <StyledForm>
          <FormControl
            className={classes.formControl}
            error={errors.username !== undefined}
          >
            <InputLabel>Email: </InputLabel>
            <Input
              name="username"
              value={values.username || ''}
              onChange={handleChange}
            />
            {touched.username && errors.username &&
              <FormHelperText id="signin__email-error-text">{errors.username}</FormHelperText>}
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
  classes: PropTypes.object,
  errors: PropTypes.shape({
    password: PropTypes.string,
    username: PropTypes.string,
  }),
  fullScreen: PropTypes.bool,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    password: PropTypes.bool,
    username: PropTypes.bool,
  }),
  values: PropTypes.shape({
    password: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default withStyles(styles)(withMobileDialog()(withRouter(withFormik({
  mapPropsToValues({ username }) {
    return {
      username: username || '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    password: Yup.string().min(6, 'Password must be 6 charcters or longer')
                  .required('Password is required'),
    username: Yup.string().required('Username is required'),
  }),
  handleSubmit(values, { setSubmitting, props }) {
    requestGraphql(loginQuery(...values))
      .then(response => {
        setSubmitting(false);
        if (response.data && response.data) {
          localStorage.setItem('token', response.data.login);
          props.history.push('/');
        }
      })
      .catch(setSubmitting(false));
  },
  enableReinitialize: true,
})(Signin))));
