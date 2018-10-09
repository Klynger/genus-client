import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const AsyncCreatePage = Loadable({
  loader: () => import('./CreatePage'),
  loading: () => null,
});

const AsyncDetailsPage = Loadable({
  loader: () => import('./DetailsPage'),
  loading: () => null,
});

const AysncGradePage = Loadable({
  loader: () => import('./DetailsPage/GradePage'),
  loading: () => null,
});

const InstitutionRoute = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/new`} component={AsyncCreatePage} />
    <Route path={`${match.path}/details`} component={AsyncDetailsPage} />
    <Route path={`${match.path}/grade/:gradeId`} component={AysncGradePage} />
    <Redirect to={`${match.path}/details`} />
  </Switch>
);

InstitutionRoute.propTypes = {
  match: PropTypes.object.isRequired,
};

export default InstitutionRoute;
