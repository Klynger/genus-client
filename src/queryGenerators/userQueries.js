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
      query {
        getUsersFromInstitutionByRole(input: {
          institutionId: ${Number(input.institutionId)}
          role: ${input.role}
        }) {
          id
          email
          username
        }
      }
  `,
  // variables: {
  //   input,
  // },
});

export default {};
