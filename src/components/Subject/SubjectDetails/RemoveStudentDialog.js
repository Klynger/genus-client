import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, withFormik } from 'formik';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { removeStudentFromSubjectId } from '../../../actions/user';
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

const RemoveStudentDialog = ({
  open,
  width,
  errors,
  values,
  classes,
  onClose,
  touched,
  subjectName,
  userName,
  fullScreen,
  handleChange,
  handleSubmit,
  isSubmitting,
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
        Tem certeza que deseja remover o estudante <DangerText>{userName}</DangerText>
        da disciplina <DangerText>{subjectName}</DangerText>? Se sim confirme sua senha.
      </DialogContentText>
      <Form className={classes.form}>
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

RemoveStudentDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    password: PropTypes.string,
    requestError: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  studentId: PropTypes.string, // eslint-disable-line
  subjectId: PropTypes.string, // eslint-disable-line
  subjectName: PropTypes.string,
  touched: PropTypes.shape({
    password: PropTypes.bool,
  }).isRequired,
  userId: PropTypes.string.isRequired, // eslint-disable-line
  userName: PropTypes.string,
  values: PropTypes.shape({
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

function mapDispatchToProps(dispatch) {
  return {
    removeUser: input => dispatch(removeStudentFromSubjectId(input)),
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
          mapPropsToValues() {
            return {
              password: '',
            };
          },
          validationSchema: Yup.object().shape({
            password: Yup.string()
              .min(6, 'A senha deve ter pelo menos 6 caracteres.')
              .max(30, 'Senha não pode ter mais que 30 caracteres.')
              .required('Senha obrigatória.'),
          }),
          handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
            const input = {
              subjectId: props.subjectId,
              subjectName: props.subjectName,
              studentId: props.userId,
              password: values.password,
            };
            props
              .removeUser(input)
              .then(res => {
                if (res.data.data.removeStudentFromSubject) {
                  resetForm({
                    password: '',
                  });
                  props.onClose();
                } else {
                  setErrors({ requestError: 'Estudante não removido! Tente novamente' });
                }
                setSubmitting(false);
              })
              .catch(() => {
                setSubmitting(false);
              });
          },
          enableReinitialize: true,
        })(RemoveStudentDialog),
      ),
    ),
  ),
);
