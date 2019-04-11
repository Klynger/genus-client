import { loader } from 'graphql.macro';

// eslint-disable-next-line import/prefer-default-export
export const mutationUpdateEvaluationResults = inputs => ({
  query: loader('./graphql/evaluationResult/updateEvaluationResults.graphql').loc.source.body,
  variables: {
    inputs,
  },
});
