import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import LoadingPage from '../LoadingPage';
import { NO_INSTUTION_SELECTED } from '../../reducers/institution';

const AsyncCreatePage = Loadable({
  loader: () => import('./CreatePage'),
  loading: LoadingPage,
});

const AsyncDetailsPage = Loadable({
  loader: () => import('./DetailsPage'),
  loading: LoadingPage,
});

// const AsyncListingPage = Loadable({
//   loader: () => import('./ListingPage'),
//   loading: LoadingPage,
// });

const InstitutionRoute = ({ match, selectedInstitution }) => {
  return (
    <Switch>
      {/* <Route path={match.path} exact component={AsyncListingPage} /> */}
      <Route path={`${match.path}/new`} component={AsyncCreatePage} />
      {selectedInstitution !== NO_INSTUTION_SELECTED ?
        <Route path={`${match.path}/details`} component={AsyncDetailsPage} /> :
        null}
      <Redirect to={{
        pathname: selectedInstitution !== NO_INSTUTION_SELECTED ?
          `${match.path}/details`
          : `${match.path}/new`,
      }}
      />
    </Switch>
  );
};

InstitutionRoute.propTypes = {
  match: PropTypes.object.isRequired,
  selectedInstitution: PropTypes.string,
};

InstitutionRoute.defaultProps = {
  selectedInstitution: NO_INSTUTION_SELECTED,
};

function mapStateToProps({ institution }) {
  return {
    selectedInstitution: institution.selectedInstitution,
  };
}

export default connect(mapStateToProps)(InstitutionRoute);
