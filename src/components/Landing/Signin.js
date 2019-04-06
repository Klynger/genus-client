import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/user';
import ProgressButton from '../shared/ProgressButton';
import CustomTextField from '../shared/CustomTextField';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import {
  Grow,
  Zoom,
  Button,
  Dialog,
  withWidth,
  withStyles,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
  withMobileDialog,
} from '@material-ui/core';

const Transition = props => {
  return <Grow in {...props} />;
};

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  singinButtonProgress: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
  },
});

function getErrorMessage(errorStatus) {
  switch (errorStatus) {
    case '0':
      return 'Houve algum problema na conexão.';
    case '404':
      return 'Usuário ou senha estão incorretos.';
    default:
      return 'Algo de errado aconteceu. Tente novamente em alguns instantes.';
  }
}

const formFields = ['email', 'password'];
function fieldToLabel(fieldName) {
  switch (fieldName) {
    case 'email':
      return 'Email';
    case 'password':
      return 'Senha';
    default:
      return '';
  }
}

const Signin = ({
  classes,
  errors,
  fullScreen,
  handleChange,
  handleSubmit,
  isSubmitting,
  values,
  open,
  onClose,
  touched,
  width,
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      classes={{
        paper: classes[`dialogRoot${capitalize(width)}`],
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
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
              id={`signin__${field}-field`}
              type={field === 'password' ? 'password' : 'text'}
              error={Boolean(touched[field] && errors[field])}
              showHelperText={Boolean(touched[field] && errors[field])}
            />
          ))}
          <DialogActions>
            <Button color="secondary" disabled={isSubmitting} onClick={onClose}>
              Cancelar
            </Button>
            <ProgressButton
              type="submit"
              className={classes.progressButton}
              showProgress={isSubmitting}
              color="primary"
              onClick={handleSubmit}
            >
              Login
            </ProgressButton>
          </DialogActions>
          {errors.requestError !== undefined && (
            <Zoom in>
              <FormHelperText error>{getErrorMessage(errors.requestError)}</FormHelperText>
            </Zoom>
          )}
        </Form>
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
    email: PropTypes.string,
    password: PropTypes.string,
    requestError: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(
  withWidth()(
    withMobileDialog({
      breakpoint: 'xs',
    })(
      withRouter(
        withFormik({
          mapPropsToValues() {
            return {
              email: '',
              password: '',
            };
          },
          validationSchema: () =>
            Yup.object().shape({
              email: Yup.string()
                .email('Email inválido.')
                .required('Email obrigatório.'),
              password: Yup.string()
                .min(6, 'A senha deve ter pelo menos 6 caracteres.')
                .max(30, 'Senha não pode ter mais que 30 caracteres.')
                .required('Senha obrigatória.'),
            }),
          handleSubmit(values, { setSubmitting, props, setErrors, resetForm }) {
            loginUser(values)
              .then(({ data }) => {
                setSubmitting(false);
                if (data.data) {
                  resetForm({
                    email: '',
                    password: '',
                  });
                  props.history.push('/');
                } else if (data.errors) {
                  setErrors({ requestError: '404' });
                }
              })
              .catch(({ request }) => {
                setErrors({ requestError: request.status.toString() });
                setSubmitting(false);
              });
          },
        })(Signin),
      ),
    ),
  ),
);
