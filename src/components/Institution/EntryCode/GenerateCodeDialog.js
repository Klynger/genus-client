import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { withFormik, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { requestGraphql } from '../../../utils/HTTPClient';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import { mutationCreateEntryCode } from '../../../queryGenerators/institutionMutations';
import {
  Zoom,
  Button,
  Dialog,
  MenuItem,
  DialogTitle,
  DialogActions,
  DialogContent,
  withMobileDialog,
} from '@material-ui/core';

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
});

const GenerateCodeDialog = ({
  open,
  roles,
  width,
  errors,
  values,
  classes,
  onClose,
  touched,
  fullScreen,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      TransitionComponent={DefaultDialogTransition}
      classes={{
        paper: classes[`dialogRoot${capitalize(width)}`],
      }}
    >
      <DialogTitle>Gerar código</DialogTitle>
      <DialogContent>
        <Form>
          <CustomTextField
            select
            name="role"
            value={values.role}
            onChange={handleChange}
            helperText={errors.role}
            label="Escolha uma opção"
            className={classes.formControl}
            id="generate-code-dialog__role"
            OnEnterHelperTextTransition={Zoom}
            error={Boolean(touched.role && errors.role)}
            showHelperText={Boolean(touched.role && errors.role)}
          >
            <MenuItem key="-1" value="-1" disabled>
              Escolha uma opção
            </MenuItem>
            {roles.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </CustomTextField>
          <DialogActions>
            <Button color="primary" disabled={isSubmitting} onClick={onClose}>
              Cancelar
            </Button>
            <ProgressButton
              type="submit"
              color="primary"
              onClick={handleSubmit}
              showProgress={isSubmitting}
            >
              Gerar Código
            </ProgressButton>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

GenerateCodeDialog.defaultProps = {
  open: false,
  roles: [
    {
      value: 'STUDENT',
      label: 'Aluno',
    },
    {
      value: 'TEACHER',
      label: 'Professor',
    },
    {
      value: 'ADMIN',
      label: 'Funcionário',
    },
  ],
};

GenerateCodeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    institutionId: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  roles: PropTypes.array,
  touched: PropTypes.shape({
    institutionId: PropTypes.bool,
    role: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    institutionId: PropTypes.string,
    role: PropTypes.oneOf(['', 'ADMIN', 'TEACHER', 'STUDENT']),
  }).isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(
  withMobileDialog({
    breakpoint: 'xs',
  })(
    withFormik({
      mapPropsToValues({ institutionId }) {
        return {
          institutionId: institutionId || '',
          role: '',
        };
      },
      validationSchema: Yup.object().shape({
        institutionId: Yup.string().required('Selecione uma instituição.'),
        role: Yup.string()
          .oneOf(['STUDENT', 'TEACHER', 'ADMIN'], 'Selecione uma opção.')
          .required('Selecione uma opção.'),
      }),
      handleSubmit(values, { setSubmitting, setErrors, props }) {
        requestGraphql(mutationCreateEntryCode(values), localStorage.getItem('token')).then(res => {
          if (res.data.data && res.data.data.createEntryCode) {
            props.onClose(res.data.data.createEntryCode);
          } else {
            setErrors({ requestError: res.status.toString() });
          }
          setSubmitting(false);
        });
      },
    })(GenerateCodeDialog),
  ),
);
