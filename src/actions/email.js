import { requestGraphql } from '../utils/HTTPClient';
import { sendEmailToTeachers, sendEmailToStudents } from '../queryGenerators/EmailQueries';

export const sendEmailToAllTeachers = (SendEmailInput, intitutionId) =>
  requestGraphql(sendEmailToTeachers(SendEmailInput, intitutionId)).then(res => {
    if (res.data && res.data.data && res.data.data.login) {
      console.log(res);
    }
    return res;
  });

export const sendEmailToAllStudents = (SendEmailInput, intitutionId) =>
  requestGraphql(sendEmailToStudents(SendEmailInput, intitutionId)).then(res => {
    if (res.data && res.data.data && res.data.data.login) {
      console.log(res);
    }
    return res;
  });
