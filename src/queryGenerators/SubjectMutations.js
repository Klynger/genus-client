import { loader } from 'graphql.macro';

export const mutationCreateSubject = input => ({
  query: loader('./graphql/subject/createSubject.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationAddTeacherToSubject = ({ subjectId, teacherId }) => ({
  query: loader('./graphql/subject/addTeacherToSubject.graphql').loc.source.body,
  variables: {
    subjectId,
    teacherId,
  },
});

export const mutationUpdateSubject = input => ({
  query: loader('./graphql/subject/updateSubject.graphql').loc.source.body,
  variables: {
    input,
  },
});

export const mutationAddStudentToSubject = ({ subjectId, studentId }) => ({
  query: loader('./graphql/subject/addStudentToSubject.graphql').loc.source.body,
  variables: {
    subjectId,
    studentId,
  },
});

export const mutationAddStudentsToSubject = ({ subjectId, studentsIds }) => ({
  query: loader('./graphql/subject/addStudentsToSubject.graphql').loc.source.body,
  variables: {
    subjectId,
    studentsIds,
  },
});

export const mutationAddStudentToSubjectsInGrade = ({ gradeId, studentId }) => ({
  query: loader('./graphql/subject/addStudentToSubjectsInGrade.graphql').loc.source.body,
  variables: {
    gradeId,
    studentId,
  },
});

export const mutationAddStudentsToSubjectsInGrade = ({ gradeId, studentsIds }) => ({
  query: loader('./graphql/subject/addStudentsToSubjectsInGrade.graphql').loc.source.body,
  variables: {
    gradeId,
    studentsIds,
  },
});
