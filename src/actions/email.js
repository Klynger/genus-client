import { requestGraphql } from '../utils/HTTPClient';
import { sendEmailToTeachers, sendEmailToStudents } from '../queryGenerators/EmailQueries';

export const sendEmailToAllTeachers = (SendEmailInput, institutionId) => {
  console.log("INPUT", SendEmailInput);
  return requestGraphql(sendEmailToTeachers(SendEmailInput, institutionId), localStorage.getItem('token')).then(res => {
    if (res.data && res.data.data && res.data.data.login) {

    }
    return res;
  });
}

export const sendEmailToAllStudents = (SendEmailInput, intitutionId) =>
  requestGraphql(sendEmailToStudents(SendEmailInput, intitutionId), localStorage.getItem('token')).then(res => {
    if (res.data && res.data.data && res.data.data.login) {
    }
    return res;
  });
