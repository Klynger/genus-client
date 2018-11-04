export const mutationCreateGrade = input => ({
  query: `
    mutation createNewGrade($input: GradeCreationInput!) {
      createGrade(input: $input) {
        id
        name
        subjects {
          id
          teachers {
            id
            username
            email
          }
          forum {
            id
            title
            replyNumber
            creationDate
            replies(page: 0, size: 10) {
              id
              content
              user {
                id
                username
                email
              }
            }
            creator {
              id
              username
              email
            }
          }
        }
      }
    }
  `,
  variables: {
    input,
  },
});

export default {};
