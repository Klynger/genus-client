import * as Yup from 'yup';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, withFormik } from 'formik';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Zoom, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ProgressButton from '../shared/ProgressButton';
import CustomTextField from '../shared/CustomTextField';
import { createUserAndLogin } from '../../actions/user';
import { FadeInButton } from '../shared/SharedComponents';

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

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  signupSubmitButton: {
    width: '100%',
  },
  progressButton: {
    margin: `${theme.spacing.unit}px 0 0 0`,
    width: '100%',
    animation: `fadeIn ${FadeInButton.defaultProps.delay * 1.3 * 2}ms`,
    keyframes: {
      '0%': {
        opacity: 0,
      },
      '50%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  },
});

const formFields = ['username', 'email', 'password'];
function fieldToLabel(fieldName) {
  switch (fieldName) {
    case 'username':
      return 'Nome';
    case 'email':
      return 'Email';
    case 'password':
      return 'Senha';
    default:
      return '';
  }
}

class Signup extends PureComponent {
  componentDidUpdate(prevProps) {
    if (
      this.props.errors.requestError !== prevProps.errors.requestError &&
      this.props.errors.requestError !== undefined
    ) {
      this.props.handleSnackbarOpen(new Error(this.props.errors.requestError));
    }
  }

  render() {
    const {
      onHandleSignin,
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
        <Form className={classes.form}>
          {formFields.map(field => (
            <CustomTextField
              key={field}
              name={field}
              value={values[field]}
              onChange={handleChange}
              label={fieldToLabel(field)}
              helperText={errors[field]}
              className={classes.formControl}
              OnEnterHelperTextTransition={Zoom}
              id={`signup__${field}-field`}
              type={field === 'password' ? 'password' : 'text'}
              error={Boolean(touched[field] && errors[field])}
              showHelperText={Boolean(touched[field] && errors[field])}
            />
          ))}
          <ProgressButton
            type="submit"
            className={classes.progressButton}
            showProgress={isSubmitting}
            color="primary"
            onClick={handleSubmit}
          >
            Registrar
          </ProgressButton>
          <FadeInButton
            color="secondary"
            disabled={isSubmitting}
            delay={FadeInButton.defaultProps.delay * 1.3}
            onClick={onHandleSignin}
          >
            Login
          </FadeInButton>
        </Form>
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
  handleSnackbarOpen: PropTypes.func.isRequired, // eslint-disable-line
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onHandleSignin: PropTypes.func.isRequired,
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
    mapPropsToValues() {
      return {
        email: '',
        password: '',
        username: '',
      };
    },
    validationSchema: () =>
      Yup.object().shape({
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
      createUserAndLogin(values)
        .then(({ data }) => {
          setSubmitting(false);
          if (data.data && data.data.createUser) {
            props.handleSnackbarOpen();
            resetForm({
              email: '',
              username: '',
              password: '',
            });
          } else if (data.data && data.data.login) {
            props.history.push('/');
          } else if (data.errors) {
            setErrors({ requestError: '400' });
          }
        })
        .catch(({ request }) => {
          if (request && request.status) {
            setErrors({ requestError: request.status });
          }
          setSubmitting(false);
        });
    },
  })(withStyles(styles)(Signup)),
);
