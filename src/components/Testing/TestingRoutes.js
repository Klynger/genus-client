import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncDiscussionPage = Loadable({
  loader: () => import('../Forum/Discussion'),
  loading: () => null,
});

const TestingRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/:discussionId`} component={AsyncDiscussionPage} />
    <Redirect to={match.path} />
  </Switch>
);

TestingRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default TestingRoutes;
