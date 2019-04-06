import { loader } from 'graphql.macro';

export const queryFindSubjectById = input => ({
  query: loader('./graphql/subject/findSubjectById.graphql').loc.source.body,
  variables: {
    input,
  },
});

export default {};
