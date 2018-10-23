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
            teachers {
              id
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

export default {};
