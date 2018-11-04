import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import SubjectLoading from './SubjectLoading';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncSubjectDetails = Loadable({
  loader: () => import('./SubjectDetailsPage'),
  loading: SubjectLoading,
});

const AsyncForum = Loadable({
  loader: () => import('./ForumPage'),
  loading: SubjectLoading,
});

const SubjectRoutes = ({ match }) => (
  <Switch>
    <Route path={match.path} exact component={AsyncSubjectDetails} />
    <Route path={`${match.path}/forum`} component={AsyncForum} />
    <Redirect to={match.path} />
  </Switch>
);

SubjectRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubjectRoutes;
