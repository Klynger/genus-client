import { loader } from 'graphql.macro';

export const mutationCreateInstitution = input => ({
  query: loader('./graphql/institution/createInstitution.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationJoinInstitution = code => ({
  query: loader('./graphql/institution/joinInstitution.graphql').loc.source.body,
  variables: {
    code,
  },
});

export const mutationUpdateInstitution = input => ({
  query: loader('./graphql/institution/updateInstitution.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationCreateEntryCode = input => ({
  query: loader('./graphql/institution/createEntryCode.graphql').loc.source.body,
  variables: {
    input,
  },
});
