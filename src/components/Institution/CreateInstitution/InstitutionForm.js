import React from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import { Input, InputLabel, FormControl, FormHelperText, Button, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addInstitution } from '../../../actions/institution';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  root: {
    padding: theme.spacing.unit * 2,
  },
});

const InstitutionForm = ({
  classes,
  touched,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  values,
}) => (
  <Paper className={classes.root}>
    <StyledForm>
      <FormControl
        className={classes.formControl}
        error={touched.name && errors.name !== undefined}
        aria-describedby="create-institution__name-error-text"
      >
        <InputLabel htmlFor="create-institution__name">Nome</InputLabel>
        <Input
          id="create-institution__name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {touched.name &&
          errors.name && (
            <FormHelperText id="create-institution__name-error-text">{errors.name}</FormHelperText>
          )}
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={touched.email && errors.email !== undefined}
        aria-describedby="create-institution__email-error-text"
      >
        <InputLabel htmlFor="create-institution__email">Email</InputLabel>
        <Input
          id="create-institution__email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        {touched.email &&
          errors.email && (
            <FormHelperText id="create-institution__email-error-text">
              {errors.email}
            </FormHelperText>
          )}
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={touched.phone && errors.phone !== undefined}
        aria-describedby="create-institution__phone-error-text"
      >
        <InputLabel htmlFor="create-institution__phone">Telefone</InputLabel>
        <Input
          id="create-institution__phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
        />
        {touched.phone &&
          errors.phone && (
            <FormHelperText id="create-institution__phone-error-text">
              {errors.phone}
            </FormHelperText>
          )}
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={touched.address && errors.address !== undefined}
        aria-describedby="create-institution__address-error-text"
      >
        <InputLabel htmlFor="create-institution__address">Endereço</InputLabel>
        <Input
          id="create-institution__address"
          name="address"
          value={values.address}
          onChange={handleChange}
        />
        {touched.address &&
          errors.address && (
            <FormHelperText id="create-institution__address-error-text">
              {errors.address}
            </FormHelperText>
          )}
      </FormControl>
      <ActionsContainer>
        <Button variant="raised" disabled={isSubmitting} style={{ marginRight: 10 }}>
          Resetar
        </Button>
        <Button
          color="primary"
          variant="raised"
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          Criar
        </Button>
      </ActionsContainer>
    </StyledForm>
  </Paper>
);

InstitutionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    address: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.shape({
    address: PropTypes.bool,
    email: PropTypes.bool,
    name: PropTypes.bool,
    phone: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addNewInstitution: institutionInput => dispatch(addInstitution(institutionInput)),
  };
}

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps,
  )(
    withRouter(
      withFormik({
        mapPropsToValues({ name, email, phone, address }) {
          return {
            address: address || '',
            email: email || '',
            name: name || '',
            phone: phone || '',
          };
        },
        validationSchema: Yup.object().shape({
          address: Yup.string()
            .min(6, 'The address must have at least 6 numbers.')
            .max(50, 'The adress cannot have more than 50 characters.')
            .required('Address is required.'),
          email: Yup.string()
            .email('You must pass a valid email')
            .required('Email is required'),
          name: Yup.string()
            .min(6, "The institution's name must have at least 6 characters.")
            .max(50, "The institution's name cannot exceed 50 characters.")
            .required('Name is required'),
          phone: Yup.string()
            .min(6, 'The phone must have at least 6 numbers.')
            .max(50, 'The phone cannot have more than 50 characters.')
            .required('Phone is required.'),
        }),
        handleSubmit(values, { setSubmitting, props }) {
          props
            .addNewInstitution(values)
            .then(() => {
              setSubmitting(false);
              props.history.push('/institution/details');
            })
            .catch(() => {
              setSubmitting(false);
            });
        },
      })(InstitutionForm),
    ),
  ),
);
