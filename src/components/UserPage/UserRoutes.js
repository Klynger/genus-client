import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const AsyncProfileDetailsPage = Loadable({
  loader: () => import('./ProfileDetailsPage'),
  loading: () => null,
});

const UserRoutes = ({ match }) => (
  <Switch>
    <Route
      exact
      path={match.path}
      component={AsyncProfileDetailsPage}
    />
    <Route
      exact
      path={`${match.path}/:userId`}
      component={AsyncProfileDetailsPage}
    />
  </Switch>
);

UserRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserRoutes;
