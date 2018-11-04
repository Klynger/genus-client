import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncGradeDetails = Loadable({
  loader: () => import('./GradeDetails'),
  loading: () => null,
});

const AsyncSubject = Loadable({
  loader: () => import('../Subject'),
  loading: () => null,
});

const GradeRoutes = ({ match }) => (
  <Switch>
    <Route path={match.path} exact component={AsyncGradeDetails} />
    <Route component={AsyncSubject} path={`${match.path}/subject/:subjectId`} />
    <Redirect to={match.path} />
  </Switch>
);

GradeRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default GradeRoutes;
