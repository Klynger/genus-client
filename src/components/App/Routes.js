import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import AuthRoute from '../utils/AuthRoute';
import LoadingPage from '../LoadingPage';

const AsyncLandingPage = Loadable({
  loader: () => import('../LandingPage'),
  loading: LoadingPage,
});

const AsyncTestingPage = Loadable({
  loader: () => import('../TestingPage'),
  loading: LoadingPage,
});

const AsyncHome = Loadable({
  loader: () => import('../Home'),
  loading: LoadingPage,
});

export default () => (
  <Switch>
    <Route path="/landing" exact component={AsyncLandingPage} />
    {process.env.NODE_ENV === 'development'
      && <Route path="/testing" component={AsyncTestingPage} />}
    <AuthRoute component={AsyncHome} />
  </Switch>
);
