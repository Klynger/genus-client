import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, withFormik } from 'formik';
import ProgressButton from '../../utils/ProgressButton';
import { updateSubject } from '../../../actions/subject';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import {
  Input,
  Button,
  Dialog,
  withStyles,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  withMobileDialog,
} from '@material-ui/core';

const styles = () => ({
  ...defaultDialogBreakpoints(),
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class EditSubjectDialog extends Component {
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
        <DialogTitle>Atualização de Disciplina</DialogTitle>
        <DialogContent>
          <Form className={classes.form}>
            <FormControl error={touched.name && errors.name !== undefined}>
              <InputLabel htmlFor="update-subject__name-field">Nome</InputLabel>
              <Input
                id="update-subject__name-field"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && <FormHelperText>{errors.name}</FormHelperText>}
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

EditSubjectDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    requestError: PropTypes.string,
  }),
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  subjectId: PropTypes.string.isRequired, // eslint-disable-line
  subjectName: PropTypes.string.isRequired, // eslint-disable-line
  submitUpdate: PropTypes.func.isRequired, // eslint-disable-line
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }),
  values: PropTypes.shape({
    name: PropTypes.string,
  }),
  width: PropTypes.string.isRequired,
};

function mapStateToProps({ subject }, { subjectId }) {
  return {
    subjectName: subject.byId[subjectId].name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitUpdate: input => dispatch(updateSubject(input)),
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
      mapPropsToValues({ subjectName }) {
        return {
          name: subjectName || '',
        };
      },
      validationSchema: () =>
        Yup.object().shape({
          name: Yup.string()
            .min(6, 'Nome da Disciplina deve conter no mínimo 6 caracteres.')
            .max(50, 'Nome da Disciplina deve conter no máximo 50 caracteres.')
            .required('Nome é obrigatório'),
        }),
      handleSubmit(values, { handleReset, props, setSubmitting, setErrors }) {
        const input = {
          ...values,
          subjectId: props.subjectId,
        };

        props
          .submitUpdate(input)
          .then(res => {
            setSubmitting(false);
            if (res.data.data.updateSubject) {
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
    })(withStyles(styles, { withTheme: true })(EditSubjectDialog)),
  ),
);
