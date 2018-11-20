import { loader } from 'graphql.macro';

export const readNotificationMutation = input => ({
  query: loader('./graphql/notification/readNotification.graphql').loc.source.body,
  variables: {
    input,
  },
});

export default {};
