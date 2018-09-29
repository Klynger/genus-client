import { SAVE_SUBJECT, SAVE_SUBJECT_TO_GRADE } from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateSubject } from '../queryGenerators/SubjectMutations';

export const saveSubject = subjectInput => dispatch => (
  requestGraphql(mutationCreateSubject(subjectInput),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.createSubject) {
        const payload = {
          gradeId: subjectInput.gradeId,
          subjectId: res.data.data.createSubject.id,
        };
        dispatch({
          type: SAVE_SUBJECT,
          subject: res.data.data.createSubject,
        });
        dispatch({
          type: SAVE_SUBJECT_TO_GRADE,
          payload,
        });
      }
    })
);

export default {};
