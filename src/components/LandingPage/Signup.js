import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl, InputLabel, FormHelperText, Input,
} from '@material-ui/core';
import { FadeInButton } from '../utils/SharedComponents';
import Axios from '../utils/HTTPClient';

const DEFAULT_ANIMATION_TIMING = 700;

const SignupContainer = styled.div`
  animation: translatedFadein ${DEFAULT_ANIMATION_TIMING}ms 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  padding: 12px;
  width: 30%;

  @keyframes translatedFadein {
    0% {
      animation-timing-function: ease-in-out;
      opacity: 0;
      transform: translateY(${props => props.totalTranslation}px);
    }

    50% {
      opacity: 0.8;
      transform: translateY(${props => props.totalTranslation * 0.2}px);
    }
    70% {
      opacity: 0.9;
      transform: translateY(${props => props.totalTranslation * 0.1}px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

SignupContainer.defaultProps = {
  totalTranslation: 100,
};

SignupContainer.propTypes = {
  totalTranslation: PropTypes.number,
};

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit,
  },
});

class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDropImage.bind(this);
  }

  handleDropImage(files) {
    const { setFieldValue } = this.props;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsDataURLString = reader.result;
        const mimeType = fileAsDataURLString.substring(0, 22);
        const photoBase64 = fileAsDataURLString.substring(22 + 1);

        setFieldValue('mimeType', mimeType);
        setFieldValue('photo', photoBase64);
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    const {
      handleSignin, classes, handleChange,
      values, errors, touched, isSubmitting,
      handleSubmit,
    } = this.props;

    return (
      <SignupContainer>
        <StyledForm>
          <FormControl
            className={classes.formControl}
            error={touched.username && errors.username !== undefined}
          >
            <InputLabel htmlFor="username">User name</InputLabel>
            <Input name="username" value={values.username} onChange={handleChange} />
            {touched.username && errors.username &&
              <FormHelperText id="signup__username-error-text">{errors.username}</FormHelperText>}
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={touched.email && errors.email !== undefined}
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" type="email" value={values.email} onChange={handleChange} />
            {touched.email && errors.email &&
              <FormHelperText id="signup__email-error-text">{errors.email}</FormHelperText>}
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={touched.password && errors.password !== undefined}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password &&
              <FormHelperText id="signup__password-error-text">{errors.password}</FormHelperText>}
          </FormControl>
          <FadeInButton
            color="primary"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Signup
          </FadeInButton>
          <FadeInButton
            color="secondary"
            delay={FadeInButton.defaultProps.delay * 1.3}
            onClick={handleSignin}
          >
            Signin
          </FadeInButton>
        </StyledForm>
      </SignupContainer>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSignin: PropTypes.func.isRequired,
  handleSnackbarOpen: PropTypes.func.isRequired, // eslint-disable-line
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
    username: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

const mutationCreateUser = userBean => ({
  query: `
    mutation createNewUser($userBean: UserBean!) {
      createUser(userBean: $userBean) {
        id
        username
        email
      }
    }
  `,
  variables: {
    userBean,
  },
});

export default withFormik({
  mapPropsToValues({ username, email }) {
    return {
      username: username || '',
      email: email || '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().trim().email('You need to pass a valid email')
      .required('Email is required'),
    password: Yup.string().min(6, 'Password must be have at least 6 characters')
      .max(30, 'Password cannot have more than 30 characters')
      .required('Password is required'),
    username: Yup.string().trim().min(6, 'User name must have at least 6 characters')
      .max(50, 'User name cannot be bigger than 50 characters')
      .lowercase()
      .required('Name is required'),
  }),
  handleSubmit(values, { setSubmitting, props }) {
    Axios.post('/', mutationCreateUser(values))
      .then(({ data }) => {
        if (data.data.createUser) {
          props.handleSnackbarOpen();
        } else if (data.errors) {
          // TODO
        }
        setSubmitting(false);
      });
  },
})(withStyles(styles)(Signup));
