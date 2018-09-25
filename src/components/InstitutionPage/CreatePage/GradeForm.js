import React from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import { connect } from 'react-redux';
import {
  Button,
  Dialog, DialogTitle,
  DialogContent, DialogActions,
  FormControl, FormHelperText,
  Input, InputLabel,
  withStyles, withMobileDialog,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { requestGraphql } from '../../utils/HTTPClient';
import { mutationCreateGrade } from '../../../queryGenerators/GradeMutations';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const styles = theme => ({
  dialogContent: {
    minWidth: '25vw',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  header: {
    backgroundColor: theme.palette.secondary.main,
  },
});

const GradeForm = ({ classes, errors, fullScreen, handleChange, handleReset, handleSubmit,
   isSubmitting, values, open, onClose, touched }) => (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      onBackdropClick={handleReset}
    >
    <DialogTitle className={classes.header}>
        Série
    </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <StyledForm>
          <FormControl
            className={classes.formControl}
            error={touched.name && errors.name !== undefined}
          >
            <InputLabel htmlFor="name">Nome </InputLabel>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {touched.name && errors.name &&
              <FormHelperText id="grade__name-error-text">{errors.name}</FormHelperText>}
          </FormControl>
        </StyledForm>
        <DialogActions>
          <Button
            color="primary"
            disabled={isSubmitting}
            onClick={() => { onClose(); handleReset(); }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Criar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

GradeForm.defaultProps = {
  open: false,
};

GradeForm.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }),
  fullScreen: PropTypes.bool,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }),
  values: PropTypes.shape({
    name: PropTypes.string,
  }),
};

function mapStateToProps({ institution }) {
  const { byId, selectedInstitution } = institution;
  return {
    institution: byId[selectedInstitution],
  };
}

export default connect(mapStateToProps)(
  withStyles(styles)(withMobileDialog()(withRouter(withFormik({
  mapPropsToValues({ name }) {
    return {
      name: name || '',
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Nome da disciplina é obrigatorio'),
  }),
  handleSubmit(values, { setSubmitting, props }) {
    // TODO
    setSubmitting(true);
    const input = {
      institutionId: props.institution.id,
      name: values.name,
    };
    requestGraphql(mutationCreateGrade(input),
      localStorage.getItem('token'))
      .then(() => {
        setSubmitting(false);
        props.onClose();
      });
  },
  enableReinitialize: true,
})(GradeForm)))));
