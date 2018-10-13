import {
  SAVE_INSTITUTION, SELECT_INSTITUTION,
  SAVE_GRADE, SAVE_SUBJECT, SAVE_USER,
} from './actionTypes';
import { NO_INSTUTION_SELECTED } from '../reducers/institution';
import { requestGraphql } from '../components/utils/HTTPClient';
import {
  mutationCreateInstitution, mutationJoinInstitution,
} from '../queryGenerators/institutionMutations';
import { queryFindInstitutionsByOwner } from '../queryGenerators/institutionQueries';

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

export const joinInstitution = code => (dispatch) => (
  requestGraphql(mutationJoinInstitution(code),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.joinInstitution) {
        const grades = res.data.data.joinInstitution.grades;
        const institution = {
          ...res.data.data.joinInstitution,
          grades: res.data.data.joinInstitution.grades.map(grade => grade.id),
        };
        dispatch({
          type: SAVE_INSTITUTION,
          institution,
        });
        grades.forEach(grade => {
          grade.subjects.forEach(subject => {
            dispatch({
              type: SAVE_SUBJECT,
              subject,
            });
          });
          grade.subjects = grade.subjects.map(sub => sub.id);
          dispatch({
            type: SAVE_GRADE,
            grade,
          });
        });
        dispatch({
          type: SELECT_INSTITUTION,
          id: institution.id,
        });
      }
      return res;
    })
);

export const fetchInstitutionsByOwner = () => (dispatch, getState) => {
  return (
    requestGraphql(queryFindInstitutionsByOwner(),
      localStorage.getItem('token'))
      .then(res => {
        let result;
        if (res.data.data && res.data.data.getInstitutionsFromLoggedUser) {
          res.data.data.getInstitutionsFromLoggedUser.forEach(institution => {
            const subjects = institution.grades.reduce((subs, gradeR) =>
              subs.concat(gradeR.subjects), []);
            const grades = institution.grades.map(gradeG => ({
              ...gradeG,
              subjects: gradeG.subjects.map(sub => sub.id),
            }));
            const adminList = [...institution.adminList];
            const teacherList = [...institution.teacherList];
            const newInstitution = {
              ...institution,
              grades: institution.grades.map(grade => grade.id),
              adminList: adminList.map(admin => admin.id),
              teacherList: teacherList.map(teacher => teacher.id),
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
            adminList.forEach(user => {
              dispatch({
                type: SAVE_USER,
                user,
              });
            });
            teacherList.forEach(user => {
              dispatch({
                type: SAVE_USER,
                user,
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
