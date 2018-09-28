export const mutationCreateGrade = input => ({
  query: `
    mutation createNewGrade($input: GradeCreationInput!) {
      createGrade(input: $input) {
        id
        name
      }
    }
  `,
  variables: {
    input,
  },
});

export default {};
