const loginQuery = authenticationBean => ({
  query: `
  query getToken($authenticationBean: AuthenticationBean!) {
    login(auth: $authenticationBean)
  }
  `,
  variables: {
    authenticationBean,
  },
});

export default loginQuery;
