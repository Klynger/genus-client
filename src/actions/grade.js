import { gradeSchema } from '../models/schema';
import { dispatchEntities } from '../components/utils/helpers';
import { requestGraphql } from '../components/utils/HTTPClient';
import { queryFindGrade } from '../queryGenerators/GradeQueries';
import { mutationCreateGrade } from '../queryGenerators/GradeMutations';
import { mutationCreateSubject } from '../queryGenerators/SubjectMutations';
import { SAVE_SUBJECT_TO_GRADE, SAVE_GRADE_TO_INSTITUTION } from './actionTypes';

export const addSubjectToGrade = subjectInput => dispatch =>
  requestGraphql(mutationCreateSubject(subjectInput), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.createSubject) {
      dispatchEntities(res.data.data.createSubject, dispatch, gradeSchema);

      dispatch({
        type: SAVE_SUBJECT_TO_GRADE,
        payload: {
          gradeId: subjectInput.gradeId,
          subjectId: res.data.data.createSubject.id,
        },
      });
    }
  });

export const createGrade = newGrade => dispatch => {
  return requestGraphql(mutationCreateGrade(newGrade), localStorage.getItem('token')).then(res => {
    const result = res;
    if (res.data.data && res.data.data.createGrade) {
      dispatchEntities(res.data.data.createGrade, dispatch, gradeSchema);
      dispatch({
        type: SAVE_GRADE_TO_INSTITUTION,
        payload: {
          gradeId: res.data.data.createGrade.id,
          institutionId: res.data.data.createGrade.institution.id,
        },
      });
    } else {
      // TODO
      // result = Promise.reject(new Error('404'));
    }
    return result;
  });
};

export const fetchGrade = id => dispatch => {
  return requestGraphql(queryFindGrade(id), localStorage.getItem('token')).then(res => {
    let result;
    if (res.data.data && res.data.data.findGrade) {
      dispatchEntities(res.data.data.findGrade, dispatch, gradeSchema);
      result = res;
    } else {
      // TODO
      // result = Promise.reject(new Error('400'));
    }

    return result;
  });
};
