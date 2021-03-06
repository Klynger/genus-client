import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import ForumLoading from './ForumLoading';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncDiscussion = Loadable({
  loader: () => import('./Discussion'),
  loading: ForumLoading,
});

const AsyncForumDiscussions = Loadable({
  loader: () => import('./ForumDiscussions'),
  loading: ForumLoading,
});

const AsyncNewDiscussion = Loadable({
  loader: () => import('./NewDiscussion'),
  loading: ForumLoading,
});

const ForumRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={match.path} exact component={AsyncForumDiscussions} />
      <Route path={`${match.path}/new-discussion`} exact component={AsyncNewDiscussion} />
      <Route path={`${match.path}/discussion/:discussionId`} component={AsyncDiscussion} />
      <Redirect to={match.path} />
    </Switch>
  );
};

ForumRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default ForumRoutes;
