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
        students {
          id
        }
        forum {
          id
          title
          replyNumber
          creationDate
          replies(page: 0, size: 10) {
            id
            content
            user {
              id
            }
          }
          creator {
            id
          }
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

export const mutationUpdateSubject = input => ({
  query: `
    mutation mutationUpdateSubject($input: UpdateSubjectInput!) {
      updateSubject(input: $input) {
        id
        name
      }
    }
  `,
  variables: {
    input,
  },
});

export const mutationAddStudentToSubject = ({ subjectId, studentId }) => ({
  query: `
    mutation addStudentToSubject($subjectId: ID!, $studentId: ID!) {
      addStudentToSubject(subjectId: $subjectId, studentId: $studentId) {
        id
        students {
          id
        }
      }
    }
  `,
  variables: {
    subjectId,
    studentId,
  },
});
