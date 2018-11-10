import { loader } from 'graphql.macro';

export const queryFindGrade = id => ({
  query: loader('./graphql/grade/findGrade.graphql').loc.source.body,
  variables: {
    id,
  },
});

export default {};
