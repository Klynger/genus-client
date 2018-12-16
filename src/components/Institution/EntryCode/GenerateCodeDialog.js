import * as Yup from 'yup';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withFormik, Form } from 'formik';
import React, { PureComponent } from 'react';
import { ExpandMore } from '@material-ui/icons';
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
  Collapse,
  MenuItem,
  DialogTitle,
  IconButton,
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
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  advancedOptions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit,
  },
  advancedOptionsFields: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  advancedOptionField: {
    width: '45%',
  },
});

const ExpandAdvancedOptions = ({ classes, onClick, expanded }) => (
  <IconButton
    className={classnames(classes.expand, {
      [classes.expandOpen]: expanded,
    })}
    onClick={onClick}
    aria-expanded={expanded}
    aria-label="Show more"
  >
    <ExpandMore />
  </IconButton>
);

ExpandAdvancedOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const advancedFormFields = ['days', 'uses'];

const convertFieldToLabel = field => {
  switch (field) {
    case advancedFormFields[0]:
      return 'Quantidade de dias';
    case advancedFormFields[1]:
      return 'Quantidade de usos';
    default:
      return '';
  }
};

class GenerateCodeDialog extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      advancedOptions: false,
    };
  }

  handleToggleAdvancedOptions = () => {
    this.setState(prevState => ({ advancedOptions: !prevState.advancedOptions }));
  };

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
    const { advancedOptions } = this.state;
    const advancedOptionError =
      Boolean(touched[advancedFormFields[0]] && errors[advancedFormFields[0]]) ||
      Boolean(touched[advancedFormFields[1]] && errors[advancedFormFields[1]]);

    const advancedOptionErrorMessage = advancedOptionError
      ? errors[advancedFormFields[0]] || errors[advancedFormFields[1]]
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
            <div className={classes.advancedOptions}>
              <ExpandAdvancedOptions
                expanded={advancedOptions}
                classes={classes}
                onClick={this.handleToggleAdvancedOptions}
              />
            </div>
            <Collapse in={advancedOptions} timeout="auto" unmountOnExit>
              <div className={classes.advancedOptionsFields}>
                {advancedFormFields.map(field => (
                  <CustomTextField
                    key={field}
                    name={field}
                    value={values[field]}
                    onChange={handleChange}
                    helperText={advancedOptionErrorMessage}
                    label={convertFieldToLabel(field)}
                    className={classes.advancedOptionField}
                    id={`generate-code-dialog__${field}`}
                    OnEnterHelperTextTransition={Zoom}
                    error={advancedOptionError}
                    showHelperText={advancedOptionError}
                  />
                ))}
              </div>
            </Collapse>
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
  }
}

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
    days: PropTypes.string,
    institutionId: PropTypes.string,
    role: PropTypes.string,
    uses: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  roles: PropTypes.array,
  touched: PropTypes.shape({
    days: PropTypes.bool,
    institutionId: PropTypes.bool,
    role: PropTypes.bool,
    uses: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    days: PropTypes.string,
    institutionId: PropTypes.string,
    role: PropTypes.oneOf(['', 'ADMIN', 'TEACHER', 'STUDENT']),
    uses: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function validateAdvancedOptions() {
  return Yup.string().matches(/\d+/, {
    message: 'Campo Obrigatório! Digite somente números.',
    excludeEmptyString: true,
  });
}

export default withStyles(styles)(
  withMobileDialog({
    breakpoint: 'xs',
  })(
    withFormik({
      mapPropsToValues({ institutionId }) {
        return {
          institutionId: institutionId || '',
          role: '',
          days: '',
          uses: '',
        };
      },
      validationSchema: Yup.object().shape({
        days: validateAdvancedOptions(),
        institutionId: Yup.string().required('Selecione uma instituição.'),
        role: Yup.string()
          .oneOf(['STUDENT', 'TEACHER', 'ADMIN'], 'Selecione uma opção.')
          .required('Selecione uma opção.'),
        uses: validateAdvancedOptions(),
      }),
      handleSubmit(values, { setSubmitting, setErrors, props }) {
        if (values.days === '' && values.uses === '') {
          const input = {
            institutionId: values.institutionId,
            role: values.role,
          };
          requestGraphql(mutationCreateEntryCode(input), localStorage.getItem('token')).then(
            res => {
              if (res.data.data && res.data.data.createEntryCode) {
                props.onClose(res.data.data.createEntryCode);
              } else {
                setErrors({ requestError: res.status.toString() });
              }
            },
          );
        } else {
          requestGraphql(
            mutationCreateAdvancedEntryCode(values),
            localStorage.getItem('token'),
          ).then(res => {
            if (res.data.data && res.data.data.createAdvancedEntryCode) {
              props.onClose(res.data.data.createAdvancedEntryCode);
            } else {
              setErrors({ requestError: res.status.toString() });
            }
          });
        }

        setSubmitting(false);
      },
    })(GenerateCodeDialog),
  ),
);
