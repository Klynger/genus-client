import { loader } from 'graphql.macro';

// export const sendEmailToTeachers = (SendEmailInput, institutionId) => ({
//   query: loader('./graphql/email/sendEmailToTeachers.graphql').loc.source.body,
//   variables: {
//     input: SendEmailInput,
//     institutionId,
//   },
// });

export const sendEmail = (SendEmailInput, id, EmailType) => ({
  query: loader('./graphql/email/sendEmail.graphql').loc.source.body,
  variables: {
    input: SendEmailInput,
    id,
    type: EmailType,
  },
});

// export const sendEmailToGradeStudents = (SendEmailInput, gradeId) => ({
//   query: loader('./graphql/email/sendEmailToGradeStudents.graphql').loc.source.body,
//   variables: {
//     input: SendEmailInput,
//     gradeId,
//   },
// });

// export const sendEmailToSubjectStudents = (SendEmailInput, subjectId) => ({
//   query: loader('./graphql/email/sendEmailToSubjectStudents.graphql').loc.source.body,
//   variables: {
//     input: SendEmailInput,
//     subjectId,
//   },
// });

export default {};
