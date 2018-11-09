export const userFragment = `
  fragment userFields on User {
    id
    username
    email
  }
`;

export const queryFindInstitutionsByOwner = () => ({
  query: `
    query findMyInstitutions {
      getInstitutionsFromLoggedUser {
        id
        name
        email
        phone
        address
        grades {
          id
          name
          subjects {
            id
            name
            grade {
              id
            }
            teachers {
              id
            }
            students {
              id
            }
            forum {
              id
              title
              content
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
            }
          }
        }
        admins {
          ...userFields
        }
        teachers {
          ...userFields
        }
        students {
          ...userFields
        }
      }
    }

    ${userFragment}
  `,
});
