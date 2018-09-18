export const mutationCreateInstitution = input => ({
  query: `
    mutation createNewInstitution($input: CreateInstitutionInput!) {
      createInstitution(input: $input) {
        id
        name
        email
        address
        phone
      }
    }
  `,
  variables: {
    input,
  },
});

export default {};
