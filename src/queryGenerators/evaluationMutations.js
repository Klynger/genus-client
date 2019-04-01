import { loader } from 'graphql.macro';

export const mutationCreateEvaluation = input => ({
  query: loader('./graphql/evaluation/createEvaluation.graphql').loc.source.body,
  variables: {
    input,
  },
});

export default {};
