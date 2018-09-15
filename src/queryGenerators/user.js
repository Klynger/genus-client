const loginQuery = (username = '', password = '') => ({
    query: `
      query {
        login(auth: {
          username: "${username}"
          password: "${password}"
        })
      }
    `,
});

export default loginQuery;
