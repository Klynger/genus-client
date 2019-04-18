import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Image from '../../shared/Image';
import { Form, withFormik } from 'formik';
import { separateBase64 } from '../../../utils/helpers';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { defaultImagesPaths } from '../../../utils/constants';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import { Dialog, DialogContent, withStyles, Button, DialogActions } from '@material-ui/core';

const styles = ({ spacing }) => ({
  paper: {
    minWidth: 300,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  customTextField: {
    width: '100%',
  },
  imageWrapper: {
    height: 150,
    width: 200,
  },
  imageContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: spacing.unit * 5,
    width: '100%',
  },
});

const EditGradeDialog = props => {
  const {
    classes,
    errors,
    handleChange,
    handleSubmit,
    open,
    touched,
    values,
    setFieldValue,
    onClose,
    isSubmitting,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={DefaultDialogTransition}
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogContent>
        <Form>
          <div className={classes.imageContainer}>
            <div className={classes.imageWrapper}>
              <Image
                rounded={false}
                src={values.image || defaultImagesPaths.GRADE}
                onImageChange={base64 => setFieldValue('image', base64)}
              />
            </div>
          </div>
          <CustomTextField
            name="name"
            label="Nome"
            value={values.name}
            onChange={handleChange}
            helperText={errors.name}
            className={classes.customTextField}
            error={Boolean(touched.name && errors.name)}
            showHelperText={Boolean(touched.name && errors.name)}
          />
        </Form>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" disabled={isSubmitting} onClick={onClose}>
          Cancelar
        </Button>
        <ProgressButton color="primary" onClick={handleSubmit} showProgress={isSubmitting}>
          Salvar
        </ProgressButton>
      </DialogActions>
    </Dialog>
  );
};

EditGradeDialog.defaultProps = {
  open: false,
};

EditGradeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  grade: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mimeType: PropTypes.string,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default withFormik({
  mapPropsToValues({ grade }) {
    let image = null;
    if (grade.mimeType && grade.photo) {
      image = `${grade.mimeType},${grade.photo}`;
    }

    return {
      name: grade.name || '',
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
  handleSubmit(values, { props }) {
    const { image, ...restValues } = values;
    const separatedImage = separateBase64(image);
    const gradeData = {
      ...restValues,
      ...separatedImage,
      gradeId: props.grade.id,
    };

    // eslint-disable-next-line no-console
    console.log('gradeData', gradeData);
  },
})(withStyles(styles, { withTheme: true })(EditGradeDialog));
