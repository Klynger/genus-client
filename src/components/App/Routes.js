import React from 'react';
import Loadable from 'react-loadable';
import LoadingPage from '../LoadingPage';
import AuthRoute from '../utils/AuthRoute';
import { Switch, Route } from 'react-router-dom';

const AsyncLandingPage = Loadable({
  loader: () => import('../LandingPage'),
  loading: LoadingPage,
});

const AsyncHome = Loadable({
  loader: () => import('../Home'),
  loading: LoadingPage,
});

export default () => (
  <Switch>
    <Route path="/landing" exact component={AsyncLandingPage} />
    <AuthRoute component={AsyncHome} />
  </Switch>
);
