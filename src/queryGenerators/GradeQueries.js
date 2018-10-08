export const queryFindGrade = id => ({
  query: `
    query findGradeById($id: ID!) {
      findGrade(input: $id) {
        id
        name
        subjects {
          id
          name
        }
      }
    }
  `,
  variables: {
    id,
  },
});

export default {};
