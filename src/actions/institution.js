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
          const admins = [...res.data.data.createInstitution.admins];
          const institution = {
            ...res.data.data.createInstitution,
            admins: admins.map(user => user.id),
          };
          dispatch({
            type: SAVE_INSTITUTION,
            institution,
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
        const admins = res.data.data.joinInstitution.admins;
        const students = res.data.data.joinInstitution.students;
        const teachers = res.data.data.joinInstitution.teachers;

        const institution = {
          ...res.data.data.joinInstitution,
          grades: res.data.data.joinInstitution.grades.map(grade => grade.id),
          admins: admins.map(admin => admin.id),
          students: students.map(student => student.id),
          teachers: teachers.map(teacher => teacher.id),
        };

        admins.forEach(user => {
          dispatch({
            type: SAVE_USER,
            user,
          });
        });

        students.forEach(user => {
          dispatch({
            type: SAVE_USER,
            user,
          });
        });

        teachers.forEach(user => {
          dispatch({
            type: SAVE_USER,
            user,
          });
        });

        dispatch({
          type: SAVE_INSTITUTION,
          institution,
        });
        grades.forEach(grade => {
          grade.subjects.forEach(subject => {
            subject = {
              ...subject,
              teachers: subject.teachers.map(({ id }) => id),
            };
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
            const admins = [...institution.admins];
            const teachers = [...institution.teachers];
            const newInstitution = {
              ...institution,
              grades: institution.grades.map(grade => grade.id),
              admins: admins.map(admin => admin.id),
              teachers: teachers.map(teacher => teacher.id),
            };
            subjects.forEach(subject => {
              subject = {
                ...subject,
                teachers: subject.teachers.map(({ id }) => id),
              };
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
            admins.forEach(user => {
              dispatch({
                type: SAVE_USER,
                user,
              });
            });
            teachers.forEach(user => {
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
