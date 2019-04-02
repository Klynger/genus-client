import { gradeSchema } from '../models/schema';
import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { SAVE_GRADE_TO_INSTITUTION } from './actionTypes';
import { queryFindGrade } from '../queryGenerators/GradeQueries';
import { mutationCreateGrade } from '../queryGenerators/GradeMutations';

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
      res.data.data.findGrade.subjects.forEach(subject => {
        subject.students.forEach(student => {
          student.studentSubjectRelations.forEach(ss => {
            ss.id = ss.user.id + ss.subject.id;
          });
        });
      });
      dispatchEntities(res.data.data.findGrade, dispatch, gradeSchema);
      result = res;
    } else {
      // TODO
      // result = Promise.reject(new Error('400'));
    }

    return result;
  });
};
