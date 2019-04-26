import { gradeSchema } from '../models/schema';
import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { queryFindGrade } from '../queryGenerators/GradeQueries';
import { SAVE_GRADE_TO_INSTITUTION, SAVE_GRADE } from './actionTypes';
import { mutationCreateGrade, mutationUpdateGrade } from '../queryGenerators/GradeMutations';

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

export const updateGrade = input => dispatch => {
  return requestGraphql(mutationUpdateGrade(input), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.updateGrade) {
      dispatch({
        type: SAVE_GRADE,
        grade: res.data.data.updateGrade,
      });
    }

    return res;
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
