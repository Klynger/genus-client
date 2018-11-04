import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import UserLoading from './UserLoading';
import { Route, Switch } from 'react-router-dom';

const AsyncProfileDetails = Loadable({
  loader: () => import('./ProfileDetails'),
  loading: UserLoading,
});

const UserRoutes = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={AsyncProfileDetails} />
    <Route exact path={`${match.path}/:userId`} component={AsyncProfileDetails} />
  </Switch>
);

UserRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserRoutes;
