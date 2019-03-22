import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import HomeLoading from './HomeLoading';
import { userRoles } from '../../utils/constants';
import { Route, Switch, Redirect } from 'react-router-dom';

// const AsyncOverview = Loadable({
//   loader: () => import('../Overview'),
//   loading: HomeLoading,
// });

const AsyncInstitution = Loadable({
  loader: () => import('../Institution'),
  loading: HomeLoading,
});

const AsyncUser = Loadable({
  loader: () => import('../User'),
  loading: HomeLoading,
});

const AsyncTesting = Loadable({
  loader: () => import('../Testing'),
  loading: HomeLoading,
});

const userRolesArr = Object.keys(userRoles).map(key => userRoles[key]);

function getDefaultPathname(role) {
  switch (role) {
    case userRoles.ADMIN:
      return '/institution';
    case userRoles.STUDENT:
      return '/profile';
    case userRoles.TEACHER:
      return '/profile';
    default:
      return '/institution';
  }
}

const HomeRoutes = ({ userRole }) => {
  if (!userRole) {
    return <HomeLoading />;
  }

  const RedirectToDefaultRoute = () => <Redirect to={{ pathname: getDefaultPathname(userRole) }} />;

  return (
    <Switch>
      <Route path="/" exact component={RedirectToDefaultRoute} />
      <Route path="/institution" component={AsyncInstitution} />
      <Route path="/profile" component={AsyncUser} />
      {process.env.NODE_ENV === 'development' && <Route path="/testing" component={AsyncTesting} />}
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

HomeRoutes.propTypes = {
  userRole: PropTypes.oneOf(userRolesArr),
};

export default HomeRoutes;
