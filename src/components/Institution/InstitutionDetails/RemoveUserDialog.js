import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, withFormik } from 'formik';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { removeUserOfInstitutionId } from '../../../actions/user';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  withMobileDialog,
  withStyles,
  withWidth,
  Zoom,
} from '@material-ui/core';

const DangerText = styled.span`
  color: red;
`;

const styles = () => ({
  ...defaultDialogBreakpoints(),
  warningText: {
    color: 'red',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const RemoveUserDialog = ({
  open,
  width,
  errors,
  values,
  classes,
  onClose,
  touched,
  userName,
  fullScreen,
  handleChange,
  handleSubmit,
  isSubmitting,
  selectedInstitutionName,
}) => (
  <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={onClose}
    TransitionComponent={DefaultDialogTransition}
    classes={{
      paper: classes[`dialogRoot${capitalize(width)}`],
    }}
  >
    <DialogTitle disableTypography>
      <Typography variant="h6">Você tem certeza disso?</Typography>
    </DialogTitle>
    <DialogContent>
      <DangerText>Cuidado, esta ação não pode ser desfeita! </DangerText>
      <DialogContentText>
        Tem certeza que deseja remover o usuário <DangerText>{userName}</DangerText>? Digite o nome
        da instituição (<DangerText>{selectedInstitutionName}</DangerText>) e senha para que a
        operação possa ser realizada!
      </DialogContentText>
      <Form className={classes.form}>
        <FormControl error={touched.institutionName && errors.institutionName !== undefined}>
          <InputLabel htmlFor="institutionName">Nome da Instituição:</InputLabel>
          <Input name="institutionName" value={values.institutionName} onChange={handleChange} />
          {touched.institutionName && errors.institutionName && (
            <Zoom in>
              <FormHelperText id="institution-name-error-text">
                {errors.institutionName}
              </FormHelperText>
            </Zoom>
          )}
        </FormControl>
        <FormControl error={touched.password && errors.password !== undefined}>
          <InputLabel htmlFor="password">Senha:</InputLabel>
          <Input name="password" type="password" value={values.password} onChange={handleChange} />
          {touched.password && errors.password && (
            <Zoom in>
              <FormHelperText id="password-error-text">{errors.password}</FormHelperText>
            </Zoom>
          )}
        </FormControl>
        {errors.requestError && (
          <FormHelperText error={Boolean(errors.requestError)}>
            {errors.requestError}
          </FormHelperText>
        )}
        <DialogActions>
          <Button color="secondary" disabled={isSubmitting} onClick={onClose}>
            Cancelar
          </Button>
          <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>
            Remover
          </Button>
        </DialogActions>
      </Form>
    </DialogContent>
  </Dialog>
);

RemoveUserDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    institutionName: PropTypes.string,
    password: PropTypes.string,
    requestError: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedInstitution: PropTypes.string, // eslint-disable-line
  selectedInstitutionName: PropTypes.string, // eslint-disable-line
  studentId: PropTypes.string, // eslint-disable-line
  subjectId: PropTypes.string, // eslint-disable-line
  touched: PropTypes.shape({
    institutionName: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  userId: PropTypes.string.isRequired, // eslint-disable-line
  userName: PropTypes.string,
  values: PropTypes.shape({
    institutionName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  width: PropTypes.string.isRequired,
};

function mapStateToProps({ institution, user }, { userId }) {
  const { selectedInstitution } = institution;
  if (userId !== '') {
    return {
      selectedInstitutionName: institution.byId[institution.selectedInstitution].name,
      selectedInstitution,
      userName: user.byId[userId].username,
    };
  }
  return {};
}

function mapDispatchToProps(dispatch, { removeUserAction }) {
  const removeUser = removeUserAction || removeUserOfInstitutionId;
  return {
    removeUser: input => dispatch(removeUser(input)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(
    withWidth()(
      withMobileDialog({
        breakpoint: 'xs',
      })(
        withFormik({
          mapPropsToValues({ institutionName }) {
            return {
              institutionName: institutionName || '',
              password: '',
            };
          },
          validationSchema: Yup.object().shape({
            institutionName: Yup.string().required('Nome da instituição é obrigatório.'),
            password: Yup.string()
              .min(6, 'A senha deve ter pelo menos 6 caracteres.')
              .max(30, 'Senha não pode ter mais que 30 caracteres.')
              .required('Senha obrigatória.'),
          }),
          handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
            if (values.institutionName === props.selectedInstitutionName) {
              let input = {};

              if (props.removeUserAction && props.subjectId) {
                input = {
                  subjectId: props.subjectId,
                  studentId: props.userId,
                  password: values.password,
                };
              } else {
                input = {
                  institutionName: values.institutionName,
                  institutionId: props.selectedInstitution,
                  password: values.password,
                  toBeRemovedId: props.userId,
                };
              }
              props
                .removeUser(input)
                .then(res => {
                  if (
                    res.data.data.removeUserFromInstitution ||
                    res.data.data.removeStudentFromSubject
                  ) {
                    resetForm({
                      institutionName: '',
                      password: '',
                    });
                    props.onClose();
                  } else {
                    setErrors({ requestError: 'Usuário não removido! Tente novamente' });
                  }
                  setSubmitting(false);
                })
                .catch(() => {
                  setSubmitting(false);
                });
            } else {
              setErrors({ requestError: 'Nome de instituição inválido! Digite novamente' });
              setSubmitting(false);
            }
          },
          enableReinitialize: true,
        })(RemoveUserDialog),
      ),
    ),
  ),
);
