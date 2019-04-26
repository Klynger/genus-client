import { loader } from 'graphql.macro';

export const mutationCreateGrade = input => ({
  query: loader('./graphql/grade/createGrade.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationUpdateGrade = input => ({
  query: loader('./graphql/grade/updateGrade.graphql').loc.source.body,
  variables: {
    input,
  },
});
