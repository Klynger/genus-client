import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const AsyncOverviewPage = Loadable({
  loader: () => import('../OverviewPage'),
  loading: () => null,
});

const AsyncInstitutionPage = Loadable({
  loader: () => import('../InstitutionPage'),
  loading: () => null,
});

const AsyncTestingPage = Loadable({
  loader: () => import('../TestingPage'),
  loading: () => null,
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
