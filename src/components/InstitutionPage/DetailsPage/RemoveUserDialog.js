import React from 'react';
import PropTypes from 'prop-types';
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
import * as Yup from 'yup';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, withFormik } from 'formik';
import { capitalize } from '@material-ui/core/utils/helpers';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import { defaultDialogBreakpoints } from '../../utils/helpers';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const DangerText = styled.span`
  color: red;
`;

const styles = () => ({
  ...defaultDialogBreakpoints(),
  warningText: {
    color: 'red',
  },
});

const RemoveUserDialog = ({
  classes, errors, fullScreen, handleSubmit, handleChange, isSubmitting,
  onClose, open, selectedInstitutionName,
  values, userName, touched, width }) => (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      TransitionComponent={DefaultDialogTransition}
      classes={{
        paper: classes[`dialogRoot${capitalize(width)}`],
      }}
    >
      <DialogTitle
        disableTypography
      >
        <Typography variant="h6">Você tem certeza disso?</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DangerText>Cuidado, esta ação não pode ser desfeita! </DangerText>
          Tem certeza que deseja remover o usuário <DangerText>{userName}? </DangerText>
          Digite o nome da instituição (<DangerText>{selectedInstitutionName}</DangerText>)
            e senha para que a operação possa ser realizada!
        </DialogContentText>
        <StyledForm>
          <FormControl
            error={touched.institutionName && errors.institutionName !== undefined}
          >
            <InputLabel htmlFor="institutionName">Nome da Instituição:</InputLabel>
            <Input
              name="institutionName"
              value={values.institutionName}
              onChange={handleChange}
            />
            {touched.institutionName && errors.institutionName &&
              <Zoom in>
                <FormHelperText id="institution-name-error-text">
                  {errors.institutionName}
                </FormHelperText>
              </Zoom>}
          </FormControl>
          <FormControl
            error={touched.password && errors.password !== undefined}
          >
            <InputLabel htmlFor="password">Senha:</InputLabel>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password &&
              <Zoom in>
                <FormHelperText id="password-error-text">
                  {errors.password}
                </FormHelperText>
              </Zoom>}
          </FormControl>
          <DialogActions>
            <Button color="secondary" disabled={isSubmitting} onClick={onClose}>
              Cancelar
            </Button>
            <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>
              Remover
            </Button>
          </DialogActions>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );

RemoveUserDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    institutionName: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedInstitutionName: PropTypes.string.isRequired,
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

function mapStateToProps({ user }, { userId }) {
  if (userId !== '') {
    return {
      userName: user.byId[userId].username,
    };
  }
  return {};
}

export default connect(mapStateToProps)(withStyles(styles)(
  withWidth()(
    withMobileDialog({
      breakpoint: 'xs',
    })(withFormik({
      mapPropsToValues({ institutionName }) {
        return {
          institutionName: institutionName || '',
          password: '',
        };
      },
      validationSchema: Yup.object().shape({
        institutionName: Yup.string().required('Nome da instituição é obrigatório'),
        password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.')
          .max(30, 'Senha não pode ter mais que 30 caracteres.')
          .required('Senha obrigatória.'),
      }),
      handleSubmit(values, { props }) {
        props.onClose(values);
      },
      enableReinitialize: true,
    })(
      RemoveUserDialog)))));
