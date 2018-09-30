export const mutationCreateInstitution = input => ({
  query: `
    mutation createNewInstitution($input: CreateInstitutionInput!) {
      createInstitution(input: $input) {
        id
        name
        email
        address
        phone
        grades {
          id
          name
          subjects {
            id
            name
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
