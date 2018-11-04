import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncGradeDetailsPage = Loadable({
  loader: () => import('./GradeDetailsPage'),
  loading: () => null,
});

const AsyncSubjectPage = Loadable({
  loader: () => import('./SubjectPage'),
  loading: () => null,
});

const GradeRoutes = ({ match }) => (
  <Switch>
    <Route path={match.path} exact component={AsyncGradeDetailsPage} />
    <Route component={AsyncSubjectPage} path={`${match.path}/subject/:subjectId`} />
    <Redirect to={match.path} />
  </Switch>
);

GradeRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default GradeRoutes;
