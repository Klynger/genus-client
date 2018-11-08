import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, withFormik } from 'formik';
import ProgressButton from '../../utils/ProgressButton';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { updateInstitution } from '../../../actions/institution';
import { NO_INSTUTION_SELECTED } from '../../../reducers/institution';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  withMobileDialog,
  withStyles,
  FormHelperText,
} from '@material-ui/core';

const styles = () => ({
  ...defaultDialogBreakpoints(),
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class EditInstitutionDialog extends Component {
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
      classes,
      errors,
      fullScreen,
      handleChange,
      handleSubmit,
      isSubmitting,
      open,
      touched,
      values,
      width,
    } = this.props;
    return (
      <Dialog
        disableBackdropClick
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        TransitionComponent={DefaultDialogTransition}
        classes={{
          paper: classes[`dialogRoot${capitalize(width)}`],
        }}
      >
        <DialogTitle>Atualização de Instituição</DialogTitle>
        <DialogContent>
          <Form className={classes.form}>
            <FormControl error={touched.name && errors.name !== undefined}>
              <InputLabel htmlFor="update-institution__name-field">Nome</InputLabel>
              <Input
                id="update-institution__name-field"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && <FormHelperText>{errors.name}</FormHelperText>}
            </FormControl>
            <FormControl error={touched.phone && errors.phone !== undefined}>
              <InputLabel htmlFor="update-institution__phone-field">Telefone</InputLabel>
              <Input
                id="update-institution__phone-field"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
              {touched.phone && errors.phone && <FormHelperText>{errors.phone}</FormHelperText>}
            </FormControl>
            <FormControl error={touched.address && errors.address !== undefined}>
              <InputLabel htmlFor="update-institution__address-field">Endereço</InputLabel>
              <Input
                id="update-institution__address-field"
                name="address"
                value={values.address}
                onChange={handleChange}
              />
              {touched.address && errors.address && (
                <FormHelperText>{errors.address}</FormHelperText>
              )}
            </FormControl>
          </Form>
          {errors.requestError && (
            <FormHelperText error={errors.requestError}>{errors.requestError}</FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" disabled={isSubmitting} onClick={this.handleClose}>
            Cancelar
          </Button>
          <ProgressButton color="primary" onClick={handleSubmit} showProgress={isSubmitting}>
            Atualizar
          </ProgressButton>
        </DialogActions>
      </Dialog>
    );
  }
}

EditInstitutionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    requestError: PropTypes.string,
  }),
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  institution: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  submitUpdate: PropTypes.func.isRequired, // eslint-disable-line
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  touched: PropTypes.shape({
    address: PropTypes.bool,
    name: PropTypes.bool,
    phone: PropTypes.bool,
  }),
  values: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
  }),
  width: PropTypes.string.isRequired,
};

function mapStateToProps({ institution }) {
  const { selectedInstitution } = institution;
  if (selectedInstitution !== NO_INSTUTION_SELECTED) {
    return {
      institution: {
        address: institution.byId[selectedInstitution].address,
        name: institution.byId[selectedInstitution].name,
        phone: institution.byId[selectedInstitution].phone,
      },
      selectedInstitution,
    };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    submitUpdate: input => dispatch(updateInstitution(input)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withMobileDialog({
    breakpoint: 'xs',
  })(
    withFormik({
      mapPropsToValues({ institution }) {
        return {
          address: institution.address || '',
          name: institution.name || '',
          phone: institution.phone || '',
        };
      },
      validationSchema: () =>
        Yup.object().shape({
          address: Yup.string()
            .min(6, 'Endereço deve conter no mínimo 6 caracteres.')
            .max(50, 'Endereço deve conter no máximo 50 caracteres.')
            .required('Endereço é obrigatório'),
          name: Yup.string()
            .min(6, 'Nome da instituição deve conter no mínimo 6 caracteres.')
            .max(50, 'Nome da instituição deve conter no máximo 50 caracteres.')
            .required('Nome é obrigatório'),
          phone: Yup.string()
            .min(6, 'Telefone deve conter no mínimo 6 digitos.')
            .max(50, 'Telefone deve conter no máximo 50 digitos.')
            .required('Telefone é obrigatório.'),
        }),
      handleSubmit(values, { handleReset, props, setSubmitting, setErrors }) {
        const input = {
          ...values,
          institutionId: props.selectedInstitution,
        };
        props
          .submitUpdate(input)
          .then(res => {
            setSubmitting(false);
            if (res.data.data.updateInstitution) {
              props.onClose();
              handleReset();
            } else {
              setErrors({ requestError: 'Algo de errado aconteceu. Tente Novamente' });
            }
          })
          .catch(() => {
            setSubmitting(false);
          });
      },
      enableReinitialize: true,
    })(withStyles(styles, { withTheme: true })(EditInstitutionDialog)),
  ),
);
