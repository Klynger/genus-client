import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingPage from '../LoadingPage';

const AsyncLandingPage = Loadable({
  loader: () => import('../LandingPage'),
  loading: LoadingPage,
});

const AsyncNotFound = Loadable({
  loader: () => import('../NotFound'),
  loading: LoadingPage,
});

export default () => (
  <Switch>
    <Route path="/landing" component={AsyncLandingPage} />
    <Route component={AsyncNotFound} />
  </Switch>
);
