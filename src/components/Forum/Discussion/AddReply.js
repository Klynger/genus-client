import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import { createReply } from '../../../actions/reply';
import ProgressButton from '../../shared/ProgressButton';
import CustomTextField from '../../shared/CustomTextField';
import { ActionsContainer } from '../../shared/SharedComponents';
import { Button, Paper, withStyles, Zoom } from '@material-ui/core';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  customTextField: {
    marginBottom: theme.spacing.unit,
  },
  root: {
    padding: theme.spacing.unit * 2,
  },
});

const AddReply = ({
  errors,
  values,
  classes,
  onClose,
  touched,
  className,
  isSubmitting,
  handleChange,
  handleSubmit,
  componentRoot: component,
}) => {
  return (
    <Paper className={classNames(classes.root, className)} component={component}>
      <Form className={classes.form}>
        <CustomTextField
          rows={7}
          multiline
          rowsMax={10}
          name="content"
          label="Comentário"
          variant="outlined"
          value={values.content}
          onChange={handleChange}
          helperText={errors.content}
          OnEnterHelperTextTransition={Zoom}
          className={classes.customTextField}
          showHelperText={Boolean(touched.content && errors.content)}
          error={Boolean(touched.content && errors.content)}
        />
        <ActionsContainer>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <ProgressButton showProgress={isSubmitting} color="primary" onClick={handleSubmit}>
            Comentar
          </ProgressButton>
        </ActionsContainer>
      </Form>
    </Paper>
  );
};

AddReply.defaultProps = {
  componentRoot: 'div',
  isReplyToReply: false,
};

AddReply.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  componentRoot: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  createNewReply: PropTypes.func.isRequired, // eslint-disable-line
  discussionId: PropTypes.string, // eslint-disable-line
  errors: PropTypes.shape({
    content: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line
  parentId: PropTypes.string, // eslint-disable-line
  isReplyToReply: PropTypes.bool, // eslint-disable-line
  touched: PropTypes.shape({
    content: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    createNewReply: input => dispatch(createReply(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withFormik({
    mapPropsToValues({ replyInput }) {
      if (replyInput) {
        return {
          content: replyInput.content,
        };
      }
      return {
        content: '',
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        content: Yup.string().required('Escreva algo.'),
      }),
    handleSubmit(values, formikBag) {
      const {
        setSubmitting,
        props: { onSubmit, parentId, discussionId, isReplyToReply, createNewReply },
      } = formikBag;

      if (!isReplyToReply) {
        createNewReply(
          {
            ...values,
            discussionId,
          },
          isReplyToReply,
        )
          .then(res => {
            if (res.data.data) {
              onSubmit();
            }
            setSubmitting(false);
          })
          .catch(() => {
            // TODO
            setSubmitting(false);
          });
      } else {
        createNewReply(
          {
            ...values,
            parentId,
          },
          isReplyToReply,
        )
          .then(res => {
            if (res.data.data) {
              // TODO
              onSubmit();
            }
            setSubmitting(false);
          })
          .catch(() => {
            // TODO
            setSubmitting(false);
          });
      }
    },
  })(withStyles(styles)(AddReply)),
);
