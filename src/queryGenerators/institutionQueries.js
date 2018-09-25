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
        }
      }
    }
  `,
});

export default {};
