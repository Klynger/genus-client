import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { Paper, Zoom } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { addInstitution } from '../../../actions/institution';
import { ActionsContainer } from '../../shared/SharedComponents';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  root: {
    borderRadius: 0,
    padding: theme.spacing.unit * 2,
  },
});

function labelText(valueName) {
  switch (valueName) {
    case 'address':
      return 'Endereço';
    case 'email':
      return 'Email';
    case 'name':
      return 'Nome';
    case 'phone':
      return 'Telefone';
    default:
      return '';
  }
}

const valuesKeys = ['name', 'email', 'phone', 'address'];
const InstitutionForm = ({
  errors,
  values,
  classes,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => (
  <Paper className={classes.root}>
    <Form className={classes.form}>
      {valuesKeys.map(key => (
        <CustomTextField
          key={key}
          name={key}
          value={values[key]}
          onChange={handleChange}
          label={labelText(key)}
          helperText={errors[key]}
          className={classes.formControl}
          OnEnterHelperTextTransition={Zoom}
          id={`create-institution__${key}-field`}
          error={Boolean(touched[key] && errors[key])}
          showHelperText={Boolean(touched[key] && errors[key])}
        />
      ))}
      <ActionsContainer>
        <ProgressButton
          type="submit"
          color="primary"
          onClick={handleSubmit}
          showProgress={isSubmitting}
        >
          Criar
        </ProgressButton>
      </ActionsContainer>
    </Form>
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
  institution: PropTypes.object, // eslint-disable-line
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
        mapPropsToValues({ institution }) {
          if (institution) {
            const { name, email, phone, address } = institution;
            return {
              name,
              email,
              phone,
              address,
            };
          }

          return {
            address: '',
            email: '',
            name: '',
            phone: '',
          };
        },
        validationSchema: () =>
          Yup.object().shape({
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
