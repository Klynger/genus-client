import { SAVE_INSTITUTION, SELECT_INSTITUTION, SAVE_GRADE, SAVE_SUBJECT, SAVE_GRADE_TO_INSTITUTION } from './actionTypes';
import { NO_INSTUTION_SELECTED } from '../reducers/institution';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateInstitution } from '../queryGenerators/institutionMutations';
import { queryFindInstitutionsByOwner } from '../queryGenerators/institutionQueries';
import { mutationCreateGrade } from '../queryGenerators/GradeMutations';

export const selectInstitution = id => dispatch => {
  dispatch({
    type: SELECT_INSTITUTION,
    id,
  });
};

export const addInstitution = institutionInput => (dispatch, getState) => {
  return (
    requestGraphql(mutationCreateInstitution(institutionInput),
      localStorage.getItem('token'))
      .then(res => {
        let result;
        if (res.data.data && res.data.data.createInstitution) {
          dispatch({
            type: SAVE_INSTITUTION,
            institution: res.data.data.createInstitution,
          });
          if (getState().institution.selectedInstitution === NO_INSTUTION_SELECTED) {
            dispatch({
              type: SELECT_INSTITUTION,
              id: res.data.data.createInstitution.id,
            });
          }
          result = res;
        } else {
          result = Promise.reject(new Error('400'));
        }
        return result;
      })
  );
};

export const fetchInstitutionsByOwner = () => (dispatch, getState) => {
  return (
    requestGraphql(queryFindInstitutionsByOwner(),
      localStorage.getItem('token'))
      .then(res => {
        let result;
        if (res.data.data && res.data.data.getInstitutionsFromLoggedUser) {
          res.data.data.getInstitutionsFromLoggedUser.forEach(institution => {
            const subjects = institution.grades.reduce((subs, grade) =>
                                    subs.concat(grade.subjects), []);
            const grades = institution.grades.map(grade => ({
              ...grade,
              subjects: grade.subjects.map(sub => sub.id),
            }));
            const newInstitution = {
              ...institution,
              grades: institution.grades.map(grade => grade.id),
            };
            subjects.forEach(subject => {
              dispatch({
                type: SAVE_SUBJECT,
                subject,
              });
            });
            grades.forEach(grade => {
              dispatch({
                type: SAVE_GRADE,
                grade,
              });
            });
            dispatch({
              type: SAVE_INSTITUTION,
              institution: newInstitution,
            });
          });

          const state = getState();
          if (state.institution.allIds.length > 0
            && state.institution.selectedInstitution === NO_INSTUTION_SELECTED) {
            dispatch({
              type: SELECT_INSTITUTION,
              id: state.institution.allIds[0],
            });
          }

          result = res;
        } else {
          result = Promise.reject(new Error('400'));
        }

        return result;
      })
  );
};

export const addGradeToInstitution = newGrade => (dispatch) => {
  return (
    requestGraphql(mutationCreateGrade(newGrade),
    localStorage.getItem('token'))
    .then(res => {
      let result = res;
      if (res.data.data && res.data.data.createGrade) {
        dispatch({
          type: SAVE_GRADE,
          grade: res.data.data.createGrade,
        });
        dispatch({
          type: SAVE_GRADE_TO_INSTITUTION,
          gradeId: res.data.data.createGrade.id,
        });
      } else {
        result = Promise.reject(new Error('404'));
      }
      return result;
    })
  );
};
