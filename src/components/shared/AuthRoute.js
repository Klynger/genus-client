import React from 'react';
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

export default AuthRoute;
