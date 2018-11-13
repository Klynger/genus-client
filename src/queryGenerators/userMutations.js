import { loader } from 'graphql.macro';

export const mutationCreateUser = userInput => ({
  query: loader('./graphql/user/createUser.graphql').loc.source.body,
  variables: {
    userInput,
  },
});

export const removerUserFromInstitution = input => ({
  query: loader('./graphql/user/removeUserFromInstitution.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationUpdateUser = input => ({
  query: loader('./graphql/user/updateUser.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationUpdateUserPassword = (password, newPassword) => ({
  query: loader('./graphql/user/updateUserPassword.graphql').loc.source.body,
  variables: {
    password,
    newPassword,
  },
});
