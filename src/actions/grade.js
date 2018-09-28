import { SAVE_GRADE, SAVE_SUBJECT, SAVE_SUBJECT_TO_GRADE } from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateGrade } from '../queryGenerators/GradeMutations';
import { mutationCreateSubject } from '../queryGenerators/SubjectMutations';

export const addGrade = gradeInput => (dispatch) => {
  return (
    requestGraphql(mutationCreateGrade(gradeInput),
      localStorage.getItem('token'))
      .then(res => {
        let result = res;
        if (res.data.data && res.data.data.createGrade) {
          dispatch({
            type: SAVE_GRADE,
            grade: res.data.data.createGrade,
          });
        } else {
          result = Promise.reject(new Error('404'));
        }
        return result;
      })
  );
};

export const addSubjectToGrade = subjectInput => (dispatch) => {
  return (
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
            ...payload,
          });
        }
      })
  );
};

export default {};
