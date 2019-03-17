import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/landing',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

AuthRoute.propTypes = {
  component: Route.propTypes.component,
  location: PropTypes.object,
};

export default AuthRoute;
