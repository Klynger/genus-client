import React from 'react';
import Loadable from 'react-loadable';
import HomeLoading from './HomeLoading';
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

const RedirectToInstitution = () => <Redirect to={{ pathname: '/institution' }} />;

const HomeRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={RedirectToInstitution} />
      <Route path="/institution" component={AsyncInstitution} />
      <Route path="/profile" component={AsyncUser} />
      {process.env.NODE_ENV === 'development' && <Route path="/testing" component={AsyncTesting} />}
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default HomeRoutes;
