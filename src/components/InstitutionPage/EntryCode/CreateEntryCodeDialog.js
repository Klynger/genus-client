import React from 'react';
import { withFormik, Form } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Dialog, DialogTitle, FormControl,
  DialogContent, withMobileDialog, withWidth,
  InputLabel, Select, MenuItem,
  FormHelperText, Zoom, DialogActions, Button, CircularProgress,
} from '@material-ui/core';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { capitalize } from '@material-ui/core/utils/helpers';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import { withStyles } from '@material-ui/core/styles';
import { requestGraphql } from '../../utils/HTTPClient';
import { mutationCreateEntryCode } from '../../../queryGenerators/entryCodeMutations';

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  createEntryCodeFormControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  createCodeButtonSubmitWrapper: {
    position: 'relative',
  },
  createCodeButtonProgress: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
  },
});

const CreateEntryCodeDialog = ({
  classes, errors, fullScreen,
  open, isSubmitting, handleChange,
  handleSubmit, onClose,
  values, institutions, touched,
  roles, width,
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
      <DialogTitle>Gerar código</DialogTitle>
      <DialogContent>
        <Form>
          <FormControl
            className={classes.createEntryCodeFormControl}
            error={touched.institutionId && errors.institutionId !== undefined}
          >
            <InputLabel
              htmlFor="create-entry-code-dialog__institution"
            >
              Escolha uma instituição
            </InputLabel>
            <Select
              id="create-entry-code-dialog__institution"
              name="institutionId"
              value={values.institutionId}
              onChange={handleChange}
            >
              <MenuItem key="-1" value="-1" disabled>
                Escolha uma instuição
              </MenuItem>
              {institutions.map(({ id, name }) => (
                <MenuItem
                  key={id}
                  value={id}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
            {touched.institutionId && errors.institutionId &&
              <Zoom in>
                <FormHelperText>
                  {errors.institutionId}
                </FormHelperText>
              </Zoom>}
          </FormControl>
          <FormControl
            className={classes.createEntryCodeFormControl}
            error={touched.role && errors.role !== undefined}
          >
            <InputLabel
              htmlFor="create-entry-code-dialog__role"
            >
              Escolha uma opção
            </InputLabel>
            <Select
              id="create-entry-code-dialog__role"
              name="role"
              value={values.role}
              onChange={handleChange}
            >
              <MenuItem key="-1" value="-1" disabled>
                Escolha uma opção
              </MenuItem>
              {roles.map(({ value, label }) => (
                <MenuItem
                  key={value}
                  value={value}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
            {touched.role && errors.role &&
              <Zoom in>
                <FormHelperText>
                  {errors.role}
                </FormHelperText>
              </Zoom>}
          </FormControl>
          <DialogActions>
            <Button color="primary" disabled={isSubmitting} onClick={onClose}>
              Cancelar
            </Button>
            <div className={classes.createCodeButtonSubmitWrapper}>
              <Button
                type="submit"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Gerar Código
              </Button>
              {isSubmitting &&
              <CircularProgress
                size={24}
                className={classes.createCodeButtonProgress}
              />}
            </div>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );

CreateEntryCodeDialog.defaultProps = {
  institutions: [],
  open: false,
  roles: [],
};

CreateEntryCodeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    institutionId: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  institutions: PropTypes.array,
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

function mapToProps({ institution }) {
  const { allIds, byId } = institution;
  return {
    institutions: allIds.map(id => byId[id]),
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
}

export default connect(mapToProps)(withStyles(styles)(withWidth()(withMobileDialog({
  breakpoint: 'xs',
})(withFormik({
  mapPropsToValues({ institutionId, role }) {
    return {
      institutionId: institutionId || '',
      role: role || '',
    };
  },
  validationSchema: Yup.object().shape({
    institutionId: Yup.string().required('Selecione uma instituição.'),
    role: Yup.string()
      .oneOf(['STUDENT', 'TEACHER', 'ADMIN'], 'Selecione uma opção.')
      .required('Selecione uma opção.'),
  }),
  handleSubmit(values, { setSubmitting, setErrors, props }) {
    requestGraphql(mutationCreateEntryCode(values),
      localStorage.getItem('token'),
    )
    .then(res => {
      if (res.data.data && res.data.data.createEntryCode) {
        props.onClose(res.data.data.createEntryCode);
      } else {
        setErrors({ requestError: res.status.toString() });
      }
      setSubmitting(false);
    });
  },
})(CreateEntryCodeDialog)))));
