export const mutationCreateDiscussion = input => ({
  query: `
    mutation createNewDiscussion($input: DiscussionCreationInput!) {
      createDiscussion(input: $input) {
        id
        title
        replyNumber
        creationDate
        replies(page: 0, size: 10) {
          id
          content
          user {
            id
          }
        }
        creator {
          id
        }
        subject {
          id
        }
      }
    }
  `,
  variables: {
    input,
  },
});

export default {};
