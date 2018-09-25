import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import { connect } from 'react-redux';
import {
  Button,
  Dialog, DialogTitle,
  DialogContent, DialogActions,
  FormControl, FormHelperText,
  Input, InputLabel,
  withStyles, withMobileDialog, Select, MenuItem,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { requestGraphql } from '../../utils/HTTPClient';
import { mutationCreateSubject } from '../../../queryGenerators/SubjectMutations';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const styles = theme => ({
  dialogContent: {
    minWidth: '25vw',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  header: {
    backgroundColor: theme.palette.secondary.main,
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
    const { classes, errors, fullScreen, handleChange, handleReset, handleSubmit,
      grades, isSubmitting, values, open, onClose, touched } = this.props;

    const { openSelect } = this.state;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        onBackdropClick={handleReset}
      >
        <DialogTitle className={classes.header}>
          Disciplina
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <StyledForm>
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
          </StyledForm>
          <Select
            name="gradeId"
            open={openSelect}
            onOpen={this.handleGradeSelectToggle}
            onClose={this.handleGradeSelectToggle}
            onChange={handleChange}
            value={values.gradeId}
          >
            {grades.map(grade => (
              <MenuItem
                key={grade.id}
                value={grade.id}
              >
                {grade.name}
              </MenuItem>
            ))}
          </Select>
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
};

SubjectForm.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }),
  fullScreen: PropTypes.bool,
  grades: PropTypes.array,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }),
  values: PropTypes.shape({
    name: PropTypes.string,
  }),
};

function mapStateToProps({ institution }) {
  const { byId, selectedInstitution } = institution;
  return {
    grades: byId[selectedInstitution].grades,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles)(withMobileDialog()(withRouter(withFormik({
  mapPropsToValues({ name, gradeId, grades }) {
    return {
      name: name || '',
      gradeId: gradeId || grades ? grades[0].id : null,
    };
  },
  validationSchema: Yup.object().shape({
    gradeId: Yup.number().required('Não selecionou a disciplina'),
    name: Yup.string().required('Nome da disciplina é obrigatorio'),
  }),
  handleSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    requestGraphql(mutationCreateSubject(values),
      localStorage.getItem('token'))
      .then(() => {
        setSubmitting(false);
      })
      .catch(setSubmitting(false));
  },
  enableReinitialize: true,
})(SubjectForm)))));
