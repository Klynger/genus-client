import { loader } from 'graphql.macro';

// eslint-disable-next-line import/prefer-default-export
export const mutationEditEvaluationResult = input => ({
  query: loader('./graphql/evaluationResult/editEvaluationResult.graphql').loc.source.body,
  variables: {
    ...input,
  },
});
