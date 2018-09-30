export const queryFindGrade = id => ({
  query: `
    query findGradeById($id: ID!) {
      findGrade(input: $id) {
        id
        name
        subjects
      }
    }
  `,
  variables: {
    id,
  },
});

export default {};
