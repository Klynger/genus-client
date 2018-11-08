import React from 'react';
import PropTypes from 'prop-types';
import TestingRoutes from './TestingRoutes';

const Testing = ({ match }) => <TestingRoutes match={match} />;

Testing.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Testing;
