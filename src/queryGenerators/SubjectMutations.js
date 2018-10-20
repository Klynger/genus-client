export const mutationCreateSubject = input => ({
  query: `
    mutation mutationCreateSubject($input: SubjectCreationInput!) {
      createSubject(input: $input) {
        id
        name
        teachers {
          id
          username
          email
        }
      }
    }
  `,
  variables: {
    input,
  },
});

export const mutationAddTeacherToSubject = ({ subjectId, teacherId }) => ({
  query: `
    mutation mutationAddTeacherToSubject($subjectId: ID!, $teacherId: ID!) {
      addTeacherToSubject(subjectId: $subjectId, teacherId: $teacherId) {
        teachers {
          id
          username
          email
        }
      }
    }
  `,
  variables: {
    subjectId,
    teacherId,
  },
});
