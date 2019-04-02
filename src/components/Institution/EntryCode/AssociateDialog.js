import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import { capitalize } from '@material-ui/core/utils/helpers';
import { joinInstitution } from '../../../actions/institution';
import { defaultDialogBreakpoints } from '../../../utils/helpers';
import { DefaultDialogTransition } from '../../shared/SharedComponents';
import {
  Zoom,
  Input,
  Button,
  Dialog,
  withWidth,
  InputLabel,
  withStyles,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  associateDialogFormControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  associateDialogProgress: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
  },
  associateDialogForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  associateDialogButtonWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
});

const AssociateDialog = ({
  classes,
  errors,
  open,
  isSubmitting,
  handleChange,
  handleSubmit,
  onClose,
  values,
  touched,
  width,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    TransitionComponent={DefaultDialogTransition}
    classes={{
      paper: classes[`dialogRoot${capitalize(width)}`],
    }}
  >
    <DialogTitle>Vincular a uma instituição</DialogTitle>
    <DialogContent>
      <Form className={classes.associateDialogForm}>
        <FormControl
          className={classes.associateDialogFormControl}
          error={touched.code && errors.code !== undefined}
        >
          <InputLabel htmlFor="associate-dialog__code-field">Código</InputLabel>
          <Input
            id="associate-dialog__code-field"
            name="code"
            value={values.code}
            onChange={handleChange}
          />
          {touched.code && errors.code && (
            <Zoom in>
              <FormHelperText>{errors.code}</FormHelperText>
            </Zoom>
          )}
        </FormControl>
      </Form>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose} disabled={isSubmitting}>
        Cancelar
      </Button>
      <div className={classes.associateDialogButtonWrapper}>
        <Button type="submit" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
          Vincular
        </Button>
        {isSubmitting && <CircularProgress size={24} className={classes.associateDialogProgress} />}
      </div>
    </DialogActions>
  </Dialog>
);

AssociateDialog.defaultProps = {
  open: false,
};

AssociateDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  joinNewInstitution: PropTypes.func.isRequired, // eslint-disable-line
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  touched: PropTypes.shape({
    code: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    joinNewInstitution: code => dispatch(joinInstitution(code)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withWidth()(
    withStyles(styles, { withTheme: true })(
      withFormik({
        mapPropsToValues() {
          return {
            code: '',
          };
        },
        validationSchema: Yup.object().shape({
          code: Yup.string().required('É necessário passar um código.'),
        }),
        handleSubmit(values, { resetForm, setSubmitting, props, setErrors }) {
          props
            .joinNewInstitution(values.code)
            .then(res => {
              if (res.data.data && res.data.data.joinInstitution) {
                // TODO tell the user that everything is ok
                props.onClose();
              } else {
                setErrors({ requestError: '400' });
              }
              setTimeout(() => {
                resetForm({ code: '' });
                setSubmitting(false);
              }, props.theme.transitions.duration.leavingScreen);
            })
            .catch(() => {
              // setErrors({ requestError: request.status.toString() });
              setTimeout(() => {
                setSubmitting(false);
              }, props.theme.transitions.duration.leavingScreen);
            });
        },
      })(AssociateDialog),
    ),
  ),
);
