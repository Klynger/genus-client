import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, withFormik } from 'formik';
import ProgressButton from '../../../../../../utils/ProgressButton';
import { ActionsContainer } from '../../../../../../utils/SharedComponents';
import {
  Zoom,
  Input,
  Paper,
  TextField,
  withStyles,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

const Container = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ unit }) => unit || 8}px;

  @media screen and (min-width: 1920px) {
    width: calc(50% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: calc(60% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: calc(70% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 700px) and (max-width: 959px) {
    width: calc(80% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 600px) and (max-width: 699px) {
    width: calc(85% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (max-width: 599px) {
    width: calc(95% - ${({ unit }) => (unit || 8) * 3}px);
  }
`;

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const NewDiscussionPage = ({
  errors,
  values,
  classes,
  touched,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => (
  <Container className={classes.root}>
    <Form className={classes.form} autoComplete="off">
      <FormControl className={classes.formControl} error={touched.title && Boolean(errors.title)}>
        <InputLabel htmlFor="new-discussion__title-field">Título</InputLabel>
        <Input
          name="title"
          value={values.title}
          onChange={handleChange}
          id="new-discussion__title-field"
        />
        {touched.title &&
          Boolean(errors.title) && (
            <Zoom in>
              <FormHelperText>{errors.title}</FormHelperText>
            </Zoom>
          )}
      </FormControl>
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
      <ActionsContainer>
        <ProgressButton showProgress={isSubmitting} color="primary" onClick={handleSubmit}>
          Criar discussão
        </ProgressButton>
      </ActionsContainer>
    </Form>
  </Container>
);

NewDiscussionPage.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.shape({
    content: PropTypes.bool,
    title: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

function mapDispatchToProps() {
  return {};
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withFormik({
    mapPropsToValues({ newDiscussion }) {
      if (!newDiscussion) {
        newDiscussion = {
          title: '',
          content: '',
        };
      }
      return newDiscussion;
    },
    validationSchema: () => {
      return Yup.object().shape({
        content: Yup.string().required('A discussão deve ter um conteúdo.'),
        title: Yup.string().required('A discussão deve ter um título.'),
      });
    },
    handleSubmit() {},
  })(withStyles(styles)(NewDiscussionPage)),
);
