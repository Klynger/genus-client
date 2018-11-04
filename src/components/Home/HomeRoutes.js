import React from 'react';
import Loadable from 'react-loadable';
import HomeLoading from './HomeLoading';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncOverviewPage = Loadable({
  loader: () => import('../OverviewPage'),
  loading: HomeLoading,
});

const AsyncInstitution = Loadable({
  loader: () => import('../Institution'),
  loading: HomeLoading,
});

const AsyncUser = Loadable({
  loader: () => import('../User'),
  loading: HomeLoading,
});

const AsyncTestingPage = Loadable({
  loader: () => import('../TestingPage'),
  loading: HomeLoading,
});

const HomeRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={AsyncOverviewPage} />
      <Route path="/institution" component={AsyncInstitution} />
      <Route path="/profile" component={AsyncUser} />
      {process.env.NODE_ENV === 'development' && (
        <Route path="/testing" component={AsyncTestingPage} />
      )}
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default HomeRoutes;
