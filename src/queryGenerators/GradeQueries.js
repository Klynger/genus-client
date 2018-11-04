export const queryFindGrade = id => ({
  query: `
    query findGradeById($id: ID!) {
      findGrade(input: $id) {
        id
        name
        subjects {
          id
          name
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
    id,
  },
});

export default {};
