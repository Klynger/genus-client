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
