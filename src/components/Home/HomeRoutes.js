import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingPage from '../LoadingPage';

const AsyncOverviewPage = Loadable({
  loader: () => import('../OverviewPage'),
  loading: LoadingPage,
});

const AsyncInstitutionPage = Loadable({
  loader: () => import('../InstitutionPage'),
  loading: LoadingPage,
});

const AsyncTestingPage = Loadable({
  loader: () => import('../TestingPage'),
  loading: LoadingPage,
});

const HomeRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={AsyncOverviewPage} />
      <Route path="/institution" component={AsyncInstitutionPage} />
      {process.env.NODE_ENV === 'development'
      && <Route path="/testing" component={AsyncTestingPage} />}
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default HomeRoutes;
