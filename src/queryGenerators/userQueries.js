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

export default {};
