import { loader } from 'graphql.macro';

export const mutationCreateEvaluationResults = input => ({
  query: loader('./graphql/evaluationResult/createEvaluationResults.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationEditEvaluationResult = input => ({
  query: loader('./graphql/evaluationResult/editEvaluationResult.graphql').loc.source.body,
  variables: {
    ...input,
  },
});
