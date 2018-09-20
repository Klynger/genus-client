import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingPage from '../LoadingPage';

const AsyncCreatePage = Loadable({
  loader: () => import('./CreatePage'),
  loading: LoadingPage,
});

const AsyncDetailsPage = Loadable({
  loader: () => import('./DetailsPage'),
  loading: LoadingPage,
});

const AsyncListingPage = Loadable({
  loader: () => import('./ListingPage'),
  loading: LoadingPage,
});

const InstitutionRoute = ({ match }) => {
  return (
    <Switch>
      <Route path={match.path} exact component={AsyncListingPage} />
      <Route path={`${match.path}/new`} component={AsyncCreatePage} />
      <Route path={`${match.path}/details/:institutionId`} component={AsyncDetailsPage} />
      <Redirect to={{ pathname: match.path }} />
    </Switch>
  );
};

InstitutionRoute.propTypes = {
  match: PropTypes.object.isRequired,
};

export default InstitutionRoute;
