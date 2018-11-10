import { loader } from 'graphql.macro';

export const loginQuery = authenticationBean => ({
  query: loader('./graphql/user/login.graphql').loc.source.body,
  variables: {
    authenticationBean,
  },
});

export const findLoggedUserQuery = () => ({
  query: loader('./graphql/user/findLoggedUser.graphql').loc.source.body,
});

export const findUserById = id => ({
  query: loader('./graphql/user/findUser.graphql').loc.source.body,
  variables: {
    id,
  },
});
