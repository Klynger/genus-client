import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
// import SubjectDetailsPage from './GradeDetailsPage/SubjectDetailsPage';

const AsyncGradeDetailsPage = Loadable({
  loader: () => import('./GradeDetailsPage'),
  loading: () => null,
});

const AsyncSubjectDetailsPage = Loadable({
  loader: () => import('./GradeDetailsPage/SubjectDetailsPage'),
  loading: () => null,
});

const GradeRoutes = ({ match }) => (
  <Switch>
    <Route path={match.path} exact component={AsyncGradeDetailsPage} />
    <Route
      exact
      component={AsyncSubjectDetailsPage}
      path={`${match.path}/subject/:subjectId`}
    />
    <Redirect to={match.path} />
  </Switch>
);

GradeRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default GradeRoutes;
