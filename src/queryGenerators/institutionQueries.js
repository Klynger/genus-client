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
          }
        }
        admins {
          ...userFields
        }
        teachers {
          ...userFields
        }
      }
    }

    ${userFragment}
  `,
});

export default {};
