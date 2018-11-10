import { loader } from 'graphql.macro';

export const mutationCreateDiscussion = input => ({
  query: loader('./graphql/discussion/createDiscussion.graphql').loc.source.body,
  variables: {
    input,
  },
});

export default {};
