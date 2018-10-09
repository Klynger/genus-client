import React, { Component } from 'react';
import { DefaultDialogTransition } from '../utils/SharedComponents';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../utils/helpers';
import { saveSubject } from '../../actions/subject';
import { withRouter } from 'react-router-dom';
import { Form, withFormik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Button, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl,
  FormHelperText, Input, InputLabel,
  withStyles, withMobileDialog, Select,
  MenuItem, withWidth,
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

class SubjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSelect: false,
    };

    this.handleGradeSelectToggle = this.handleGradeSelectToggle.bind(this);
  }

  handleGradeSelectToggle() {
    this.setState(prevState => ({ openSelect: !prevState.openSelect }));
  }

  render() {
    const {
      handleSubmit, grades, isSubmitting,
      classes, errors, fullScreen,
      handleChange, handleReset,
      values, open, onClose,
      touched, width,
    } = this.props;

    const { openSelect } = this.state;

    const gradeIdHasError = Boolean(errors.gradeId);

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
        <DialogTitle>
          Disciplina
        </DialogTitle>
        <DialogContent>
          <Form className={classes.subjectForm}>
            <FormControl
              className={classes.formControl}
              error={touched.name && errors.name !== undefined}
            >
              <InputLabel htmlFor="name">Nome </InputLabel>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name &&
                <FormHelperText id="subject__name-error-text">{errors.name}</FormHelperText>}
            </FormControl>
          </Form>
          <Select
            name="gradeId"
            open={openSelect}
            onOpen={this.handleGradeSelectToggle}
            onClose={this.handleGradeSelectToggle}
            onChange={handleChange}
            value={values.gradeId}
          >
            <MenuItem
              key={-1}
              value={-1}
            >
              Escolha uma Série
            </MenuItem>
            {grades.map(grade => (
              <MenuItem
                key={grade.id}
                value={grade.id}
              >
                {grade.name}
              </MenuItem>
            ))}
          </Select>
          {touched.gradeId && errors.gradeId &&
            <FormHelperText error={touched.gradeId && gradeIdHasError}>
              {errors.gradeId}
            </FormHelperText>}
          <DialogActions>
            <Button
              color="primary"
              disabled={isSubmitting}
              onClick={() => { onClose(); handleReset(); }}
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Criar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

SubjectForm.defaultProps = {
  open: false,
  grades: [],
};

SubjectForm.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }),
  fullScreen: PropTypes.bool.isRequired,
  grades: PropTypes.array,
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
      grades: institution.byId[selectedInstitution].grades
        .map(gradeId => grade.byId[gradeId]),
    };
  }
  return {};
}


function mapDispatchToProps(dispatch) {
  return {
    saveNewSubject: subjectInput => dispatch(saveSubject(subjectInput)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withWidth()(withMobileDialog({
    breakpoint: 'xs',
  })(withRouter(withFormik({
    mapPropsToValues({ name, gradeId }) {
      return {
        name: name || '',
        gradeId: gradeId || -1,
      };
    },
    validationSchema: Yup.object().shape({
      gradeId: Yup.number().positive('Selecione uma Série').required('Não selecionou a Série'),
      name: Yup.string().required('Nome da disciplina é obrigatorio'),
    }),
    handleSubmit(values, { setSubmitting, props }) {
      setSubmitting(true);
      props.saveNewSubject(values)
        .then(() => {
          props.onClose();
          setSubmitting(false);
        })
        .catch(setSubmitting(false));
    },
    enableReinitialize: true,
  })(SubjectForm))))));
