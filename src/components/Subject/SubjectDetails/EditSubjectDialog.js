import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from '../../shared/Image';
import React, { Component } from 'react';
import { Form, withFormik } from 'formik';
import { separateBase64 } from '../../../utils/helpers';
import ProgressButton from '../../shared/ProgressButton';
import { updateSubject } from '../../../actions/subject';
import { defaultImagesPaths } from '../../../utils/constants';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
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

const styles = ({ spacing }) => ({
  paper: {
    minWidth: 300,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    height: 140,
    width: 140,
  },
  imageContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: spacing.unit * 5,
    width: '100%',
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
      setFieldValue,
    } = this.props;

    return (
      <Dialog
        disableBackdropClick
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        TransitionComponent={DefaultDialogTransition}
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogTitle>Atualização de Disciplina</DialogTitle>
        <DialogContent>
          <Form className={classes.form}>
            <div className={classes.imageContainer}>
              <div className={classes.imageWrapper}>
                <Image
                  rounded={false}
                  src={values.image || defaultImagesPaths.SUBJECT}
                  onImageChange={base64 => setFieldValue('image', base64)}
                />
              </div>
            </div>
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
  setFieldValue: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mimeType: PropTypes.string,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
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
};

function mapDispatchToProps(dispatch) {
  return {
    submitUpdate: input => dispatch(updateSubject(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withMobileDialog({
    breakpoint: 'xs',
  })(
    withFormik({
      mapPropsToValues({ subject }) {
        let image = null;
        if (subject.mimeType && subject.photo) {
          image = `${subject.mimeType},${subject.photo}`;
        }
        return {
          name: subject.name || '',
          image,
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
        const { image, ...restValues } = values;
        const separatedImage = separateBase64(image);
        const subjectData = {
          ...restValues,
          ...separatedImage,
          subjectId: props.subject.id,
        };

        props
          .submitUpdate(subjectData)
          .then(res => {
            setSubmitting(false);
            if (res.data.data.updateSubject) {
              props.onClose();
              handleReset();
            } else {
              setErrors({ requestError: 'Algo de errado aconteceu. Tente Novamente.' });
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
