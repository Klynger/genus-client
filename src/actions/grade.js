import { SAVE_GRADE } from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateGrade } from '../queryGenerators/GradeMutations';

export const addGrade = gradeInput => (dispatch) => {
  return (
    requestGraphql(mutationCreateGrade(gradeInput),
    localStorage.getItem('token'))
    .then(res => {
      let result;
      if (res.data.data && res.data.data.createGrade) {
        dispatch({
          type: SAVE_GRADE,
          grade: res.data.data.createGrade,
        });
        result = res.data;
      } else {
        result = Promise.reject(new Error('404'));
      }
      return result;
    })
  );
};

export default {};
