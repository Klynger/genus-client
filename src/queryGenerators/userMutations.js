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

export const mutationUpdateUser = input => ({
  query: `
    mutation updateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        username
      }
    }
  `,
  variables: {
    input,
  },
});

export const mutationUpdateUserPassword = (password, newPassword) => ({
  query: `
    mutation updateUserPassword($password: String!, $newPassword: String!) {
      updateUserPassword(password: $password, newPassword: $newPassword)
    }
  `,
  variables: {
    password,
    newPassword,
  },
});
