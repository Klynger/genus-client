import { requestGraphql } from '../utils/HTTPClient';
import { sendEmail } from '../queryGenerators/EmailQueries';

export const sendEmailTo = (SendEmailInput, id, EmailType) =>
  requestGraphql(
    sendEmail(SendEmailInput, id, EmailType),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data && res.data.data && res.data.data.sendEmail) {
      return res;
    }
    return res.request.status.toString();
  });
