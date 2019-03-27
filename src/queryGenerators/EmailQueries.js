import { loader } from 'graphql.macro';

export const sendEmailToTeachers = (SendEmailInput, institutionId) => ({
  query: loader('./graphql/email/sendEmailToTeachers.graphql').loc.source.body,
  variables: {
    input: SendEmailInput,
    institutionId,
  },
});

export const sendEmailToStudents = (SendEmailInput, institutionId) => ({
  query: loader('./graphql/email/sendEmailToStudents.graphql').loc.source.body,
  variables: {
    input: SendEmailInput,
    institutionId,
  },
});

export const sendEmailToGradeStudents = (SendEmailInput, gradeId) => ({
  query: loader('./graphql/email/sendEmailToGradeStudents.graphql').loc.source.body,
  variables: {
    input: SendEmailInput,
    gradeId,
  },
});

export const sendEmailToSubjectStudents = (SendEmailInput, subjectId) => ({
  query: loader('./graphql/email/sendEmailToSubjectStudents.graphql').loc.source.body,
  variables: {
    input: SendEmailInput,
    subjectId,
  },
});

export default {};
