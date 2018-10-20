import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import HomeLoading from './HomeLoading';

const AsyncOverviewPage = Loadable({
  loader: () => import('../OverviewPage'),
  loading: HomeLoading,
});

const AsyncInstitutionPage = Loadable({
  loader: () => import('../InstitutionPage'),
  loading: HomeLoading,
});

const AsyncUserPage = Loadable({
  loader: () => import('../UserPage'),
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
      <Route path="/institution" component={AsyncInstitutionPage} />
      <Route path="/profile" component={AsyncUserPage} />
      {process.env.NODE_ENV === 'development'
      && <Route path="/testing" component={AsyncTestingPage} />}
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default HomeRoutes;
