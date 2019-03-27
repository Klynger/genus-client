import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { withFormik, Form } from 'formik';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { requestGraphql } from '../../../utils/HTTPClient';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import { sendEmailToAllTeachers, sendEmailToAllStudents } from '../../../actions/email';
import {
  Zoom,
  Button,
  Dialog,
  Input,
  MenuItem,
  TextField,
  DialogTitle,
  InputLabel,
  DialogActions,
  DialogContent,
  withMobileDialog,
  FormHelperText,
} from '@material-ui/core';

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  formControl: {
    margin: `${theme.spacing.unit}px 0`,
    minWidth: 120,
    width: '100%',
  },
});

const emailFields = ['title', 'content'];

const convertFieldToLabel = field => {
  switch (field) {
    case emailFields[0]:
      return 'Título';
    case emailFields[1]:
      return 'Email';
    default:
      return '';
  }
};

class SendEmailDialog extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
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
    } = this.props;

    const emailError =
      Boolean(touched[emailFields[0]] && errors[emailFields[0]]) ||
      Boolean(touched[emailFields[1]] && errors[emailFields[1]]);

    const emailErrorMessage = emailError ? errors[emailFields[0]] || errors[emailFields[1]] : '';

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
        <DialogTitle>Enviar Email</DialogTitle>
        <DialogContent>
          <Form>
            <CustomTextField
              select
              name="role"
              value={values.role}
              onChange={handleChange}
              helperText={errors.role}
              label="Enviar email para"
              className={classes.formControl}
              id="send-email-dialog__role"
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
            <CustomTextField
              name="title"
              value={values.title}
              onChange={handleChange}
              helperText={errors.title}
              label="Título"
              className={classes.advancedOptionField}
              id={'send-email-dialog__title'}
              OnEnterHelperTextTransition={Zoom}
              error={Boolean(touched.title && errors.title)}
              showHelperText={emailError}
            />
            {/* <InputLabel htmlFor="new-email__title-field">Título</InputLabel>
            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              id="new-email__title-field"
            /> */}
            <Zoom in>
              <FormHelperText>{errors.title}</FormHelperText>
            </Zoom>
            <TextField
              rows={10}
              multiline
              rowsMax={15}
              name="content"
              variant="outlined"
              onChange={handleChange}
              className={classes.formControl}
              helperText={touched.content && errors.content}
              error={touched.content && Boolean(errors.content)}
            />
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
                Enviar email
              </ProgressButton>
            </DialogActions>
            {errors.requestError && (
              <Zoom in>
                <FormHelperText error={errors.requestError !== ''}>
                  {errors.requestError}
                </FormHelperText>
              </Zoom>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
}

SendEmailDialog.defaultProps = {
  open: false,
  roles: [
    {
      value: 'STUDENT',
      label: 'Alunos',
    },
    {
      value: 'TEACHER',
      label: 'Professores',
    },
  ],
};

SendEmailDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    content: PropTypes.string,
    institutionId: PropTypes.string,
    role: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  roles: PropTypes.array,
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  touched: PropTypes.shape({
    content: PropTypes.bool,
    institutionId: PropTypes.bool,
    role: PropTypes.bool,
    title: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    content: PropTypes.string,
    institutionId: PropTypes.string,
    role: PropTypes.oneOf(['', 'TEACHER', 'STUDENT']),
    title: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function validateEmail() {
  return Yup.string().matches(/\d+/, {
    message: 'Campo Obrigatório!.',
  });
}

export default withMobileDialog({
  breakpoint: 'xs',
})(
  withStyles(styles, { withTheme: true })(
    withFormik({
      mapPropsToValues({ institutionId }) {
        return {
          institutionId: institutionId || '',
          role: '',
          title: '',
          content: '',
        };
      },
      validationSchema: Yup.object().shape({
        content: validateEmail(),
        institutionId: Yup.string().required('Selecione uma instituição.'),
        role: Yup.string()
          .oneOf(['STUDENT', 'TEACHER'], 'Selecione uma opção.')
          .required('Selecione uma opção.'),
        title: validateEmail(),
      }),
      handleSubmit(values, { resetForm, setSubmitting, setErrors, props }) {
        if (values.content !== '' && values.title !== '') {
          const input = {
            subject: values.title,
            text: values.content,
          };

          if (values.role === 'TEACHER') {
            sendEmailToAllTeachers(input, values.institutionId)
              .then(({ data }) => {
                setSubmitting(false);
                if (data.data) {

                } else if (data.errors) {
                  setErrors({ requestError: '404' });
                }
              })
              .catch(({ request }) => {
                setErrors({ requestError: request.status.toString() });
                setSubmitting(false);
              });
          } else if (values.role === 'STUDENT') {
            sendEmailToAllStudents(input, values.institutionId)
              .then(({ data }) => {
                setSubmitting(false);
                if (data.data) {

                } else if (data.errors) {
                  setErrors({ requestError: '404' });
                }
              })
              .catch(({ request }) => {
                setErrors({ requestError: request.status.toString() });
                setSubmitting(false);
              });
          }

        } else {
          setErrors({ requestError: 'Campo de dias e usos são ambos obrigatórios!' });
          setSubmitting(false);
        }
      },
    })(SendEmailDialog),
  ),
);
