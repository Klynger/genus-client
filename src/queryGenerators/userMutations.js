export const mutationCreateUser = userInput => ({
  query: `
    mutation createNewUser($userInput: CreateUserInput!) {
      createUser(input: $userInput) {
        id
        username
        email
      }
    }
  `,
  variables: {
    userInput,
  },
});

export default {};
