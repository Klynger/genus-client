export const mutationCreateGrade = input => ({
  query: `
    mutation createNewGrade($input: GradeCreationInput!) {
      createGrade(input: $input) {
        id
      }
    }
  `,
  variables: {
    input,
  },
});

export default {};
