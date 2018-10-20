export const queryFindGrade = id => ({
  query: `
    query findGradeById($id: ID!) {
      findGrade(input: $id) {
        id
        name
        subjects {
          id
          name
          teachers {
            id
            username
            email
          }
        }
      }
    }
  `,
  variables: {
    id,
  },
});

export default {};
