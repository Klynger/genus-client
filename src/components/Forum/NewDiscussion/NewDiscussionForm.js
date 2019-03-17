import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import ProgressButton from '../../shared/ProgressButton';
import { createDiscussion } from '../../../actions/discussion';
import { ActionsContainer } from '../../shared/SharedComponents';
import CustomMarkdownEditor from '../../shared/CustomMarkdownEditor';
import {
  Fade,
  Zoom,
  Input,
  Paper,
  withStyles,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
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

const NewDiscussionForm = ({
  errors,
  values,
  classes,
  touched,
  isSubmitting,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => (
  <Fade in>
    <Paper className={classes.root}>
      <Form className={classes.form} autoComplete="off">
        <FormControl className={classes.formControl} error={touched.title && Boolean(errors.title)}>
          <InputLabel htmlFor="new-discussion__title-field">Título</InputLabel>
          <Input
            name="title"
            value={values.title}
            onChange={handleChange}
            id="new-discussion__title-field"
          />
          {touched.title && Boolean(errors.title) && (
            <Zoom in>
              <FormHelperText>{errors.title}</FormHelperText>
            </Zoom>
          )}
        </FormControl>
        <FormControl
          className={classes.formControl}
          error={touched.content && Boolean(errors.content)}
        >
          <CustomMarkdownEditor
            name="content"
            onChange={content => setFieldValue('content', content, true)}
            content={values.content}
          />
          {touched.content && Boolean(errors.content) && (
            <Zoom in>
              <FormHelperText>{errors.content}</FormHelperText>
            </Zoom>
          )}
        </FormControl>
        <ActionsContainer>
          <ProgressButton showProgress={isSubmitting} color="primary" onClick={handleSubmit}>
            Criar discussão
          </ProgressButton>
        </ActionsContainer>
      </Form>
    </Paper>
  </Fade>
);

NewDiscussionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createNewDiscussion: PropTypes.func.isRequired, // eslint-disable-line
  errors: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      subjectId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    content: PropTypes.bool,
    title: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    createNewDiscussion: input => dispatch(createDiscussion(input)),
  };
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
    handleSubmit(values, { props, setSubmitting }) {
      props
        .createNewDiscussion({
          ...values,
          subjectId: props.match.params.subjectId,
        })
        .then(res => {
          if (res.data.data) {
            const path = props.match.url.replace(/\/new-discussion/g, '');
            props.history.push(path);
          }
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  })(withStyles(styles)(NewDiscussionForm)),
);
