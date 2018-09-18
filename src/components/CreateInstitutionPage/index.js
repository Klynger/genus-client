import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, InputLabel, FormControl,
  FormHelperText, Button,
  Dialog, DialogActions, DialogContent,
  withMobileDialog, DialogTitle, Grow,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
// import { requestGraphql } from '../utils/HTTPClient';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

function DialogTransition(props) {
  return <Grow {...props} />;
}

const styles = theme => ({
  dialogContent: {
    minWidth: '30vw',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  createInstitutionHeader: {
    backgroundColor: theme.palette.secondary.main,
  },
});

const CreateInstituionPage = ({
  open, classes, touched,
  errors, handleChange, handleSubmit,
  isSubmitting, onClose, values,
  fullScreen,
}) => {
      return (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={onClose}
          TransitionComponent={DialogTransition}
          aria-labelledby="create-institution__dialog-title"
        >
          <DialogTitle
            id="create-institution__dialog-title"
            className={classes.createInstitutionHeader}
          >
            Create Institution
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <StyledForm>
              <FormControl
                className={classes.formControl}
                error={touched.name && errors.name !== undefined}
                aria-describedby="create-institution__name-error-text"
              >
                <InputLabel htmlFor="create-institution__name">Name</InputLabel>
                <Input
                  id="create-institution__name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {touched.name && errors.name &&
                <FormHelperText id="create-institution__name-error-text">
                  {errors.name}
                </FormHelperText>}
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
                {touched.email && errors.email &&
                <FormHelperText id="create-institution__email-error-text">
                  {errors.email}
                </FormHelperText>}
              </FormControl>
              <FormControl
                className={classes.formControl}
                error={touched.phone && errors.phone !== undefined}
                aria-describedby="create-institution__phone-error-text"
              >
                <InputLabel htmlFor="create-institution__phone">Phone</InputLabel>
                <Input
                  id="create-institution__phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />
                {touched.phone && errors.phone &&
                <FormHelperText id="create-institution__phone-error-text">
                  {errors.phone}
                </FormHelperText>}
              </FormControl>
              <FormControl
                className={classes.formControl}
                error={touched.address && errors.address !== undefined}
                aria-describedby="create-institution__address-error-text"
              >
                <InputLabel htmlFor="create-institution__address">Address</InputLabel>
                <Input
                  id="create-institution__address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                {touched.address && errors.address &&
                <FormHelperText id="create-institution__address-error-text">
                  {errors.address}
                </FormHelperText>}
              </FormControl>
            </StyledForm>
            <DialogActions>
              <Button
                color="secondary"
                disabled={isSubmitting}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Create
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );
    };

CreateInstituionPage.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    address: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
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

// const mutationCreateInstitution = input => ({
//   query: `
//     mutation createNewInstitution($input: CreateInstitutionInput!) {
//       createInstitution(input: $input) {
//         name
//         email
//         address
//         phone
//       }
//     }
//   `,
//   variables: {
//     input,
//   },
// });

export default withStyles(styles)(withMobileDialog()(
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
      email: Yup.string().email('You must pass a valid email')
      .required('Email is required'),
      name: Yup.string()
        .min(6, 'The institution\'s name must have at least 6 characters.')
        .max(50, 'The institution\'s name cannot exceed 50 characters.')
        .required('Name is required'),
      phone: Yup.string()
        .min(6, 'The phone must have at least 6 numbers.')
        .max(50, 'The phone cannot have more than 50 characters.')
        .required('Phone is required.'),
    }),
    handleSubmit(values, { setSubmitting, props }) {
      // requestGraphql(mutationCreateInstitution(values))
      //   .then((res) => {
      //     console.log('data', res);
      //   });
        setSubmitting(false);
        props.onClose();
    },
  })(CreateInstituionPage)));
