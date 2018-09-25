const loginQuery = authenticationBean => ({
  query: `
  query getToken($authenticationBean: AuthenticationInput!) {
    login(input: $authenticationBean)
  }
  `,
  variables: {
    authenticationBean,
  },
});

export default loginQuery;
