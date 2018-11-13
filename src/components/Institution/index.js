import React from 'react';
import PropTypes from 'prop-types';
import InstitutionRoute from './InstitutionRoutes';

const InstitutionPage = ({ match }) => <InstitutionRoute match={match} />;

InstitutionPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default InstitutionPage;
