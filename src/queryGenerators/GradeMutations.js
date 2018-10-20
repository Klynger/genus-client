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
        }
      }
    }
  `,
  variables: {
    input,
  },
});

export default {};
