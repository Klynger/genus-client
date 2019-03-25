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
import {
  mutationCreateEntryCode,
  mutationCreateAdvancedEntryCode,
} from '../../../queryGenerators/institutionMutations';
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

    const emailErrorMessage = emailError
      ? errors[emailFields[0]] || errors[emailFields[1]]
      : '';

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
                    id={`send-email-dialog__title`}
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
    title: PropTypes.string,
    institutionId: PropTypes.string,
    role: PropTypes.string,
    content: PropTypes.string,
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
    title: PropTypes.bool,
    institutionId: PropTypes.bool,
    role: PropTypes.bool,
    content: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    title: PropTypes.string,
    institutionId: PropTypes.string,
    role: PropTypes.oneOf(['', 'TEACHER', 'STUDENT']),
    content: PropTypes.string,
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
        title: validateEmail(),
        institutionId: Yup.string().required('Selecione uma instituição.'),
        role: Yup.string()
          .oneOf(['STUDENT', 'TEACHER'], 'Selecione uma opção.')
          .required('Selecione uma opção.'),
        content: validateEmail(),
      }),
      handleSubmit(values, { resetForm, setSubmitting, setErrors, props }) {
        if (values.title === '' && values.content === '') {
          const input = {
            institutionId: values.institutionId,
            role: values.role,
          };
          requestGraphql(mutationCreateEntryCode(input), localStorage.getItem('token')).then(
            res => {
              if (res.data.data && res.data.data.createEntryCode) {
                props.onClose(res.data.data.createEntryCode);
                resetForm({
                  institutionId: '',
                  role: '',
                  title: '',
                  content: '',
                });
              } else {
                setErrors({ requestError: res.status.toString() });
              }
              setTimeout(() => {
                setSubmitting(false);
              }, props.theme.transitions.duration.leavingScreen);
            },
          );
        } else if (values.content !== '' && values.title !== '') {
          requestGraphql(
            mutationCreateAdvancedEntryCode(values),
            localStorage.getItem('token'),
          ).then(res => {
            if (res.data.data && res.data.data.createAdvancedEntryCode) {
              props.onClose(res.data.data.createAdvancedEntryCode);
              resetForm({
                institutionId: '',
                role: '',
                title: '',
                content: '',
              });
            } else {
              setErrors({ requestError: res.status.toString() });
            }
            setTimeout(() => {
              setSubmitting(false);
            }, props.theme.transitions.duration.leavingScreen);
          });
        } else {
          setErrors({ requestError: 'Campo de dias e usos são ambos obrigatórios!' });
          setSubmitting(false);
        }
      },
    })(SendEmailDialog),
  ),
);
