export const loginQuery = authenticationBean => ({
  query: `
  query getToken($authenticationBean: AuthenticationInput!) {
    login(input: $authenticationBean)
  }
  `,
  variables: {
    authenticationBean,
  },
});

export const findLoggedUserQuery = () => ({
  query: `
    query {
      findLoggedUser {
        id
        username
        email
      }
    }
  `,
});

export const getUsersFromInstitutionByRole = input => ({
  query: `
      query getUsersFromInstitutionByRole($input: GetUsersFromInstitutionByRoleInput!){
        getUsersFromInstitutionByRole(input: $input) {
          id
          email
          username
        }
      }
  `,
  variables: {
    input,
  },
});

export const findUserById = id => ({
  query: `
    query findUserById($id: ID!) {
      findUser(id: $id) {
        id
        email
        username
      }
    }
  `,
  variables: {
    id,
  },
});
