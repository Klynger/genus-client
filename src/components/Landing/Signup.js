import * as Yup from 'yup';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, withFormik } from 'formik';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { requestGraphql } from '../utils/HTTPClient';
import { withStyles } from '@material-ui/core/styles';
import { FadeInButton } from '../utils/SharedComponents';
import { loginQuery } from '../../queryGenerators/userQueries';
import { mutationCreateUser } from '../../queryGenerators/userMutations';
import {
  Zoom,
  Input,
  Paper,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';

const DEFAULT_ANIMATION_TIMING = 700;

const SignupContainer = styled(Paper)`
  animation: translatedFadein ${DEFAULT_ANIMATION_TIMING}ms 1;
  border-radius: 5px;
  padding: 12px;
  z-index: 10;

  @keyframes translatedFadein {
    0% {
      animation-timing-function: ease-in-out;
      opacity: 0;
      transform: translateY(100px);
    }

    50% {
      opacity: 0.8;
      transform: translateY(20px);
    }
    70% {
      opacity: 0.9;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (min-width: 1920px) {
    width: 30%;
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: 40%;
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: 50%;
  }

  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: 70%;
  }

  @media screen and (max-width: 599px) {
    width: 95%;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const styles = theme => ({
  signupButtonProgress: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  signupButtonWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  signupSubmitButton: {
    width: '100%',
  },
});

class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDropImage = this.handleDropImage.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.errors.requestError !== prevProps.errors.requestError &&
      this.props.errors.requestError !== undefined
    ) {
      this.props.handleSnackbarOpen(new Error(this.props.errors.requestError));
    }
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
      handleSignin,
      classes,
      handleChange,
      values,
      errors,
      touched,
      isSubmitting,
      handleSubmit,
    } = this.props;

    return (
      <SignupContainer>
        <StyledForm>
          <FormControl
            className={classes.formControl}
            error={touched.username && errors.username !== undefined}
          >
            <InputLabel htmlFor="username">Nome</InputLabel>
            <Input name="username" value={values.username} onChange={handleChange} />
            {touched.username &&
              errors.username && (
                <Zoom in>
                  <FormHelperText id="signup__username-error-text">
                    {errors.username}
                  </FormHelperText>
                </Zoom>
              )}
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={touched.email && errors.email !== undefined}
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" type="email" value={values.email} onChange={handleChange} />
            {touched.email &&
              errors.email && (
                <Zoom in>
                  <FormHelperText id="signup__email-error-text">{errors.email}</FormHelperText>
                </Zoom>
              )}
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={touched.password && errors.password !== undefined}
          >
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password &&
              errors.password && (
                <Zoom in>
                  <FormHelperText id="signup__password-error-text">
                    {errors.password}
                  </FormHelperText>
                </Zoom>
              )}
          </FormControl>
          <div className={classes.signupButtonWrapper}>
            <FadeInButton
              className={classes.signupSubmitButton}
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Registrar
            </FadeInButton>
            {isSubmitting && (
              <CircularProgress size={24} className={classes.signupButtonProgress} />
            )}
          </div>
          <FadeInButton
            color="secondary"
            delay={FadeInButton.defaultProps.delay * 1.3}
            onClick={handleSignin}
          >
            Login
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
    requestError: PropTypes.string,
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

export default withRouter(
  withFormik({
    mapPropsToValues({ username, email }) {
      return {
        username: username || '',
        email: email || '',
        password: '',
      };
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .email('Você deve passar um email válido.')
        .required('Email obrigatório.'),
      password: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres.')
        .max(30, 'Senha não pode ter mais que 30 caracteres.')
        .required('Senha obrigatória.'),
      username: Yup.string()
        .trim()
        .lowercase()
        .min(6, 'Nome deve ter pelo menos 6 caracteres.')
        .max(50, 'Nome não pode ter mais de 50 caracteres.')
        .required('Nome obrigatório'),
    }),
    handleSubmit(values, { setSubmitting, props, setErrors, resetForm }) {
      requestGraphql(mutationCreateUser(values))
        .then(({ data }) => {
          if (data.data.createUser) {
            props.handleSnackbarOpen();
            const loginUser = {
              email: values.email,
              password: values.password,
            };
            requestGraphql(loginQuery(loginUser))
              .then(res => {
                if (res.data.data) {
                  localStorage.setItem('token', res.data.data.login);
                  props.history.push('/');
                } else if (data.errors) {
                  setErrors({ requestError: '400' }); // handle this error on inside form
                  setSubmitting(false);
                }
              })
              .catch(({ request }) => {
                setErrors({ requestError: request.status });
                setSubmitting(false);
              });
            resetForm({
              email: '',
              username: '',
              password: '',
            });
          } else if (data.errors) {
            // TODO in this case the errors must be handle inside the form
            setErrors({ requestError: '400' });
            setSubmitting(false);
          }
        })
        .catch(({ request }) => {
          setErrors({ requestError: request.status });
          setSubmitting(false);
        });
    },
  })(withStyles(styles)(Signup)),
);
