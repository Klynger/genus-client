import React, { Component } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import { updateUser } from '../../../actions/user';
import ProgressButton from '../../utils/ProgressButton';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
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

class EditUserDialog extends Component {
  handleClose = () => {
    const DELAY_AFTER_TRANSITION = 50;
    const {
      onClose, handleReset, setSubmitting,
      theme: { transitions: { duration: { leavingScreen } } },
    } = this.props;
    setSubmitting(true);
    onClose();
    setTimeout(() => {
      handleReset();
      setSubmitting(false);
    }, leavingScreen + DELAY_AFTER_TRANSITION);
  }

  render() {
    const {
      open, width, classes,
      values, errors, touched, handleSubmit,
      fullScreen, handleChange, isSubmitting,
    } = this.props;

    // if more attributes get added to this dialog
    // the prop disableBackdropClick of Dialog should be true
    return (
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={this.handleClose}
        TransitionComponent={DefaultDialogTransition}
        classes={{
          paper: classes[`dialogRoot${capitalize(width)}`],
        }}
      >
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <Form className={classes.form}>
            <FormControl
              className={classes.formControl}
              error={errors.username !== undefined && touched.username}
            >
              <InputLabel
                htmlFor="edit-user-dialog__username-field"
              >
                Nome
              </InputLabel>
              <Input
                name="username"
                value={values.username}
                onChange={handleChange}
                id="edit-user-dialog__username-field"
              />
              {touched.username && errors.username &&
              <Zoom in>
                <FormHelperText>{errors.username}</FormHelperText>
              </Zoom>}
            </FormControl>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={this.handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <ProgressButton
            color="primary"
            onClick={handleSubmit}
            showProgress={isSubmitting}
          >
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
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
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
  width: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (input) => dispatch(updateUser(input)),
  };
}

export default connect(null, mapDispatchToProps)(withFormik({
  enableReinitialize: true,
  mapPropsToValues({ user }) {
    return {
      username: user.username || '',
    };
  },
  validationSchema: () => (
    Yup.object().shape({
      username: Yup.string()
        .min(6, 'Nome deve ter pelo menos 6 caracteres.')
        .max(50, 'Nome não pode ter mais de 50 caracteres.')
        .required('Nome obrigatório'),
    })),
  handleSubmit(values, { props, setSubmitting }) {
    props.updateUser(values)
      .then(() => {
        props.onClose();
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
})(withMobileDialog({
    breakpoint: 'xs',
  })(withStyles(styles, { withTheme: true })(EditUserDialog))));
