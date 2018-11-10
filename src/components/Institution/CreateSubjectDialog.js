import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { saveSubject } from '../../actions/subject';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { DefaultDialogTransition } from '../shared/SharedComponents';
import {
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
  withMobileDialog,
} from '@material-ui/core';

const styles = theme => ({
  ...defaultDialogBreakpoints(),
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  subjectForm: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class CreateSubjectDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSelect: false,
    };
  }

  handleGradeSelectToggle = () => {
    this.setState(prevState => ({ openSelect: !prevState.openSelect }));
  };

  render() {
    const {
      handleSubmit,
      isSubmitting,
      classes,
      errors,
      fullScreen,
      handleChange,
      handleReset,
      values,
      open,
      onClose,
      touched,
      width,
    } = this.props;

    return (
      <Dialog
        TransitionComponent={DefaultDialogTransition}
        onBackdropClick={handleReset}
        fullScreen={fullScreen}
        onClose={onClose}
        open={open}
        classes={{
          paper: classes[`dialogRoot${capitalize(width)}`],
        }}
      >
        <DialogTitle>Disciplina</DialogTitle>
        <DialogContent>
          <Form className={classes.subjectForm}>
            <FormControl
              className={classes.formControl}
              error={touched.name && errors.name !== undefined}
            >
              <InputLabel htmlFor="name">Nome</InputLabel>
              <Input name="name" value={values.name} onChange={handleChange} />
              {touched.name && errors.name && (
                <FormHelperText id="subject__name-error-text">{errors.name}</FormHelperText>
              )}
            </FormControl>
          </Form>
          <DialogActions>
            <Button
              color="primary"
              disabled={isSubmitting}
              onClick={() => {
                onClose();
                handleReset();
              }}
            >
              Cancelar
            </Button>
            <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>
              Criar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

CreateSubjectDialog.defaultProps = {
  open: false,
};

CreateSubjectDialog.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }),
  fullScreen: PropTypes.bool.isRequired,
  gradeId: PropTypes.string.isRequired, // eslint-disable-line
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

function mapStateToProps({ grade, institution }) {
  const { selectedInstitution } = institution;

  if (institution.byId[selectedInstitution]) {
    return {
      grades: institution.byId[selectedInstitution].grades.map(gradeId => grade.byId[gradeId]),
    };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewSubject: subjectInput => dispatch(saveSubject(subjectInput)),
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
        withRouter(
          withFormik({
            mapPropsToValues({ name }) {
              return {
                name: name || '',
              };
            },
            validationSchema: Yup.object().shape({
              name: Yup.string().required('Nome da disciplina é obrigatorio'),
            }),
            handleSubmit(
              values,
              {
                setSubmitting,
                props: { gradeId, onClose, saveNewSubject },
              },
            ) {
              values = {
                ...values,
                gradeId,
              };
              setSubmitting(true);
              saveNewSubject(values)
                .then(() => {
                  onClose();
                  setSubmitting(false);
                })
                .catch(setSubmitting(false));
            },
            enableReinitialize: true,
          })(CreateSubjectDialog),
        ),
      ),
    ),
  ),
);
