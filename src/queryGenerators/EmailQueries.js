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

// export const sendEmailToGradeStudents = (SendEmailInput, gradeId) => ({
//   query: loader('./graphql/user/sendEmailToGradeStudents.graphql').loc.source.body,
//   variables: {
//     gradeId,
//     SendEmailInput,
//   },
// });

// export const sendEmailToSubjectStudents = (SendEmailInput, gradeId) => ({
//   query: loader('./graphql/user/sendEmailToSubjectStudents.graphql').loc.source.body,
//   variables: {
//     gradeId,
//     SendEmailInput,
//   },
// });

export default {};
