import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncCreateInstitution = Loadable({
  loader: () => import('./CreateInstitution'),
  loading: () => null,
});

const AsyncInstitutionDetails = Loadable({
  loader: () => import('./InstitutionDetails'),
  loading: () => null,
});

const AsyncGrade = Loadable({
  loader: () => import('../Grade'),
  loading: () => null,
});

const InstitutionRoute = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/new`} component={AsyncCreateInstitution} />
    <Route path={`${match.path}/details`} component={AsyncInstitutionDetails} />
    <Route path={`${match.path}/grade/:gradeId`} component={AsyncGrade} />
    <Redirect to={`${match.path}/details`} />
  </Switch>
);

InstitutionRoute.propTypes = {
  match: PropTypes.object.isRequired,
};

export default InstitutionRoute;
