import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import ProgressButton from '../../utils/ProgressButton';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import { mutationUpdateUserPassword } from '../../../queryGenerators/userMutations';
import { requestGraphql } from '../../utils/HTTPClient';
import {
  Zoom,
  Input,
  Button,
  Dialog,
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
});

const EditPasswordDialog = ({
  open,
  isSubmitting,
  onClose,
  classes,
  width,
  fullScreen,
  values,
  errors,
  handleChange,
  handleSubmit,
  touched,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullScreen={fullScreen}
    TransitionComponent={DefaultDialogTransition}
    classes={{
      paper: classes[`dialogRoot${capitalize(width)}`],
    }}
  >
    <DialogTitle>Alterar senha</DialogTitle>
    <DialogContent>
      <Form className={classes.form}>
        <FormControl
          className={classes.formControl}
          error={(Boolean(errors.password) && touched.password) || Boolean(errors.requestError)}
        >
          <InputLabel htmlFor="edit-password-dialog__password-field">Senha atual</InputLabel>
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            id="edit-password-dialog__password-field"
          />
          {touched.password && Boolean(errors.password) && (
            <Zoom in>
              <FormHelperText>{errors.password}</FormHelperText>
            </Zoom>
          )}
          {Boolean(errors.requestError) && (
            <Zoom in>
              <FormHelperText>{errors.requestError}</FormHelperText>
            </Zoom>
          )}
        </FormControl>
        <FormControl
          className={classes.formControl}
          error={Boolean(errors.newPassword) && touched.newPassword}
        >
          <InputLabel htmlFor="edit-password-dialog__new-password-field">Nova senha</InputLabel>
          <Input
            type="password"
            name="newPassword"
            onChange={handleChange}
            value={values.newPassword}
            id="edit-password-dialog__new-password-field"
          />
          {touched.newPassword && Boolean(errors.newPassword) && (
            <Zoom in>
              <FormHelperText>{errors.newPassword}</FormHelperText>
            </Zoom>
          )}
        </FormControl>
        <FormControl
          className={classes.formControl}
          error={Boolean(errors.passwordConfirm) && touched.passwordConfirm}
        >
          <InputLabel htmlFor="edit-password-dialog__password-confirm-field">
            Confirmação de senha
          </InputLabel>
          <Input
            type="password"
            name="passwordConfirm"
            onChange={handleChange}
            value={values.passwordConfirm}
            id="edit-password-dialog__password-confirm-field"
          />
          {touched.passwordConfirm && Boolean(errors.passwordConfirm) && (
            <Zoom in>
              <FormHelperText>{errors.passwordConfirm}</FormHelperText>
            </Zoom>
          )}
        </FormControl>
      </Form>
    </DialogContent>
    <DialogActions>
      <Button color="secondary" onClick={onClose} disabled={isSubmitting}>
        Cancelar
      </Button>
      <ProgressButton color="primary" onClick={handleSubmit} showProgress={isSubmitting}>
        Salvar
      </ProgressButton>
    </DialogActions>
  </Dialog>
);

EditPasswordDialog.defaultProps = {
  open: false,
};

EditPasswordDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    newPassword: PropTypes.string,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
    requestError: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    newPassword: PropTypes.bool,
    password: PropTypes.bool,
    passwordConfirm: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    newPassword: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirm: PropTypes.string.isRequired,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function mapToProps({ user: { loggedUserId } }) {
  return {
    loggedUserId,
  };
}

export default connect(mapToProps)(
  withFormik({
    mapPropsToValues() {
      return {
        passwordConfirm: '',
        password: '',
        newPassword: '',
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        newPassword: Yup.string()
          .min(6, 'A senha deve ter pelo menos 6 caracteres.')
          .max(30, 'Senha não pode ter mais que 30 caracteres.')
          .required('Senha obrigatória.'),
        password: Yup.string()
          .min(6, 'A senha deve ter pelo menos 6 caracteres.')
          .max(30, 'Senha não pode ter mais que 30 caracteres.')
          .required('Senha obrigatória.'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('newPassword')], 'Senhas não correspondem.')
          .required('Confirmação de senha é obrigatória.'),
      }),
    handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
      requestGraphql(
        mutationUpdateUserPassword(values.password, values.newPassword),
        localStorage.getItem('token'),
      )
        .then(res => {
          setSubmitting(false);
          if (res.data.data.updateUserPassword) {
            resetForm({
              passwordConfirm: '',
              password: '',
              newPassword: '',
            });
            props.onClose();
          } else if (res.data.errors) {
            setErrors({ requestError: 'Senha atual incorreta! Tente novamente.' });
          }
        })
        .catch(() => setSubmitting(false));
    },
  })(
    withMobileDialog({
      breakpoint: 'xs',
    })(withStyles(styles)(EditPasswordDialog)),
  ),
);
