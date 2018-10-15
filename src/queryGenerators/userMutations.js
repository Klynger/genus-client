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

export const removerUserFromInstitution = input => ({
  query: `
    mutation removeUserFromInstitution($input: RemoveUserFromInstitutionInput!) {
      removeUserFromInstitution(input: $input)
    }
  `,
  variables: {
    input,
  },
});

export default {};
