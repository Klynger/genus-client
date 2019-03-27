import { requestGraphql } from '../utils/HTTPClient';
import { sendEmailToTeachers, sendEmailToStudents } from '../queryGenerators/EmailQueries';

export const sendEmailToAllTeachers = (SendEmailInput, institutionId) => {
  return requestGraphql(
    sendEmailToTeachers(SendEmailInput, institutionId),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data && res.data.data && res.data.data.sendEmailToTeachers) {
      return res.data.data.sendEmailToTeachers;
    }
    return res.request.status.toString();
  });
};

export const sendEmailToAllStudents = (SendEmailInput, intitutionId) =>
  requestGraphql(
    sendEmailToStudents(SendEmailInput, intitutionId),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data && res.data.data && res.data.data.sendEmailToStudents) {
      return res;
    }
    return res.request.status.toString();
  });

export const sendEmailToGradeStudents = (SendEmailInput, gradeId) => {
  return requestGraphql(
    sendEmailToTeachers(SendEmailInput, gradeId),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data && res.data.data && res.data.data.sendEmailToGradeStudents) {
      return res.data.data.sendEmailToGradeStudents;
    }
    return res.request.status.toString();
  });
};

export const sendEmailToSubjectStudents = (SendEmailInput, subjectId) =>
  requestGraphql(
    sendEmailToStudents(SendEmailInput, subjectId),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data && res.data.data && res.data.data.sendEmailToSubjectStudents) {
      return res.data.data.sendEmailToSubjectStudents;
    }
    return res.request.status.toString();
  });
