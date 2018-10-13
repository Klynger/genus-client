const userFragment = `
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
        adminList {
          ...userFields
        }
        teacherList {
          ...userFields
        }
      }
    }

    ${userFragment}
  `,
});

export default {};
