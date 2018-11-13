import { loader } from 'graphql.macro';

export const mutationCreateReply = input => ({
  query: loader('./graphql/reply/createReply.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationReplyToReply = input => ({
  query: loader('./graphql/reply/replyToReply.graphql').loc.source.body,
  variables: {
    input,
  },
});

export default {};
