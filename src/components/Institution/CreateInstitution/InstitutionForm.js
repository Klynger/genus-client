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

const phoneRegExp = new RegExp([
  '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})',
  '[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$',
]);

function fieldToLabel(fieldName) {
  switch (fieldName) {
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

const formFields = ['name', 'email', 'phone', 'address'];
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
          id={`create-institution__${field}-field`}
          error={Boolean(touched[field] && errors[field])}
          showHelperText={Boolean(touched[field] && errors[field])}
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
              .min(6, 'Endereço deve ter pelo menos 6 caracteres.')
              .max(50, 'Endereço deve ter no máximo 50 caracteres.')
              .required('Endereço é obrigatório.'),
            email: Yup.string()
              .email('Você deve apresentar um email válido.')
              .required('Email é obrigatório.'),
            name: Yup.string()
              .min(6, 'Nome da instituição deve ter pelo menos 6 caracteres.')
              .max(50, 'Nome da instituição deve ter no máximo 50 caracteres.')
              .required('Nome da instituição é obrigatório.'),
            phone: Yup.string()
              .min(6, 'Telefone deve ter pelo menos 6 caracteres.')
              .max(50, 'Telefone deve ter no máximo 50 caracteres.')
              .matches(phoneRegExp, 'Telefone inválido.')
              .required('Número de telefone é obrigatório.'),
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
