export const queryFindInstitutionsByOwner = ownerId => ({
  query: `
    query findMyInstitutions($ownerId: ID!) {
      findInstitutionsByOwner(ownerId: $ownerId) {
        id
        name
        email
        address
        phone
      }
    }
  `,
  variables: {
    ownerId,
  },
});

export default {};
