export const mutationCreateEntryCode = input => ({
  query: `
    mutation createNewEntryCode($input: CreateEntryCodeInput!) {
      createEntryCode(input: $input)
    }
  `,
  variables: {
    input,
  },
});

export default {};
