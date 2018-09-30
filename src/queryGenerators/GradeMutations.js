export const mutationCreateGrade = input => ({
  query: `
    mutation createNewGrade($input: GradeCreationInput!) {
      createGrade(input: $input) {
        id
        name
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
