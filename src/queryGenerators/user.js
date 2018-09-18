const loginQuery = userBean => ({
  query: `
  mutation createNewUser($userBean: UserBean!) {
    createUser(userBean: $userBean) {
      id
      username
      email
    }
  }
  `,
  variables: {
    userBean,
  },
});

export default loginQuery;
