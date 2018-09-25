export const mutationCreateSubject = input => ({
  query: `
    mutation mutationCreateSubject($input: SubjectCreationInput!) {
      createSubject(input: $input) {
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
