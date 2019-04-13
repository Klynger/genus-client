import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from '../../shared/Image';
import React, { Component } from 'react';
import { Form, withFormik } from 'formik';
import { updateUser } from '../../../actions/user';
import { separateBase64 } from '../../../utils/helpers';
import ProgressButton from '../../shared/ProgressButton';
import { defaultImagesPaths } from '../../../utils/constants';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
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
} from '@material-ui/core';

const styles = theme => ({
  dialog: {
    minWidth: 300,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  imageWrapper: {
    height: 140,
    width: 140,
  },
  imageContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

class EditUserDialog extends Component {
  handleClose = () => {
    const DELAY_AFTER_TRANSITION = 50;
    const {
      onClose,
      handleReset,
      setSubmitting,
      theme: {
        transitions: {
          duration: { leavingScreen },
        },
      },
    } = this.props;
    setSubmitting(true);
    onClose();
    setTimeout(() => {
      handleReset();
      setSubmitting(false);
    }, leavingScreen + DELAY_AFTER_TRANSITION);
  };

  render() {
    const {
      open,
      classes,
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      isSubmitting,
      setFieldValue,
    } = this.props;

    return (
      <Dialog
        open={open}
        disableBackdropClick
        onClose={this.handleClose}
        classes={{ paper: classes.dialog }}
        TransitionComponent={DefaultDialogTransition}
      >
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <Form className={classes.form}>
            <div className={classes.imageContainer}>
              <span className={classes.imageWrapper}>
                <Image
                  onImageChange={base64 => setFieldValue('image', base64)}
                  src={values.image ? values.image : defaultImagesPaths.USER}
                />
              </span>
            </div>
            <FormControl
              className={classes.formControl}
              error={errors.username !== undefined && touched.username}
            >
              <InputLabel htmlFor="edit-user-dialog__username-field">Nome</InputLabel>
              <Input
                name="username"
                value={values.username}
                onChange={handleChange}
                id="edit-user-dialog__username-field"
              />
              {touched.username && errors.username && (
                <Zoom in>
                  <FormHelperText>{errors.username}</FormHelperText>
                </Zoom>
              )}
            </FormControl>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <ProgressButton color="primary" onClick={handleSubmit} showProgress={isSubmitting}>
            Salvar
          </ProgressButton>
        </DialogActions>
      </Dialog>
    );
  }
}

EditUserDialog.defaultProps = {
  open: false,
};

EditUserDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setFieldValue: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  touched: PropTypes.shape({
    username: PropTypes.bool,
  }).isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line
  values: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateUser: input => dispatch(updateUser(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withFormik({
    enableReinitialize: true,
    mapPropsToValues({ user }) {
      let image;
      if (user.mimeType && user.photo) {
        image = `${user.mimeType},${user.photo}`;
      }
      return {
        username: user.username || '',
        image,
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        username: Yup.string()
          .min(6, 'Nome deve ter pelo menos 6 caracteres.')
          .max(50, 'Nome não pode ter mais de 50 caracteres.')
          .required('Nome obrigatório'),
      }),
    handleSubmit(values, { props, setSubmitting }) {
      const { image, ...restValues } = values;
      const separatedImage = separateBase64(image);
      const userData = {
        ...restValues,
        ...separatedImage,
      };
      props
        .updateUser(userData)
        .then(() => {
          props.onClose();
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  })(withStyles(styles, { withTheme: true })(EditUserDialog)),
);
