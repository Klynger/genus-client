export const mutationCreateGrade = input => ({
  query: `
    mutation createNewGrade($input: GradeCreationInput!) {
      createGrade(input: $input) {
        id
        name
        institution {
          id
        }
        subjects {
          id
        }
      }
    }
  `,
  variables: {
    input,
  },
});

export default {};
