import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Fade } from '@material-ui/core';
import NewDiscussionForm from './NewDiscussionForm';
import DefaultContainerRoute from '../../utils/DefaultContainerRoute';

const NewDiscussionPage = ({ match, history }) => {
  return (
    <Fade in>
      <DefaultContainerRoute>
        <NewDiscussionForm history={history} match={match} />
      </DefaultContainerRoute>
    </Fade>
  );
};

NewDiscussionPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      subjectId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(NewDiscussionPage);
