import React from 'react';
import PropTypes from 'prop-types';
import GradeDetailsPage from './GradeDetailsPage';
import { Route, Switch, Redirect } from 'react-router-dom';


const GradeRoutes = ({ match }) => (
  <Switch>
    <Route path={match.path} exact component={GradeDetailsPage} />
    <Redirect to={match.path} />
  </Switch>
);

GradeRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default GradeRoutes;
