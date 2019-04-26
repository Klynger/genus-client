import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from '../../shared/Image';
import { Form, withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { Paper, Zoom } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { defaultImagesPaths } from '../../../utils/constants';
import { addInstitution } from '../../../actions/institution';
import { ActionsContainer } from '../../shared/SharedComponents';
import { phoneRegExp, separateBase64 } from '../../../utils/helpers';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  imageWrapper: {
    height: 250,
    width: 250,
  },
  imageContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  root: {
    padding: theme.spacing.unit * 2,
  },
});

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
const InstitutionForm = props => {
  const {
    errors,
    values,
    classes,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = props;

  return (
    <Paper className={classes.root}>
      <Form className={classes.form}>
        <div className={classes.imageContainer}>
          <span className={classes.imageWrapper}>
            <Image
              rounded={false}
              src={values.image || defaultImagesPaths.INSTITUTION}
              onImageChange={base64 => setFieldValue('image', base64)}
            />
          </span>
        </div>
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
};

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
  setFieldValue: PropTypes.func.isRequired,
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
            const { name, email, phone, address, mimeType, photo } = institution;
            let image = null;
            if (mimeType && photo) {
              image = `${mimeType},${photo}`;
            }
            return {
              name,
              email,
              phone,
              address,
              image,
            };
          }

          return {
            address: '',
            email: '',
            name: '',
            phone: '',
            image: null,
          };
        },
        validationSchema: () =>
          Yup.object().shape({
            address: Yup.string()
              .min(6, 'Endereço deve ter pelo menos 6 caracteres.')
              .max(50, 'Endereço deve ter no máximo 50 caracteres.')
              .required('Endereço é obrigatório.'),
            email: Yup.string()
              .email('Email inválido.')
              .required('Email é obrigatório.'),
            image: Yup.string(),
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
          const { image, ...restValues } = values;
          const separatedImage = separateBase64(image);
          const institutionData = {
            ...restValues,
            ...separatedImage,
          };

          props
            .addNewInstitution(institutionData)
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
