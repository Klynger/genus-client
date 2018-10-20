import { requestGraphql } from '../components/utils/HTTPClient';
import {
  mutationCreateSubject, mutationAddTeacherToSubject,
} from '../queryGenerators/SubjectMutations';
import {
  SAVE_SUBJECT, SAVE_SUBJECT_TO_GRADE, SAVE_USER,
  ADD_TEACHER_TO_SUBJECT,
} from './actionTypes';

export const saveSubject = subjectInput => dispatch => (
  requestGraphql(mutationCreateSubject(subjectInput),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.createSubject) {
        const subject = {
          ...res.data.data.createSubject,
          teachers: res.data.data.createSubject.teachers.map(user => {
            dispatch({
              type: SAVE_USER,
              user,
            });
            return user.id;
          }),
        };
        dispatch({
          type: SAVE_SUBJECT,
          subject,
        });

        const payload = {
          gradeId: subjectInput.gradeId,
          subjectId: subject.id,
        };
        dispatch({
          type: SAVE_SUBJECT_TO_GRADE,
          payload,
        });
      }
    })
);

export const addTeacherToSubject = payload => dispatch => (
  requestGraphql(mutationAddTeacherToSubject(payload),
  localStorage.getItem('token'))
  .then(res => {
    if (res.data.data && res.data.data.addTeacherToSubject) {
      const teachers = res.data.data.addTeacherToSubject.teachers;

      teachers.forEach(user => {
        if (user.id === payload.teacherId) {
          dispatch({
            type: ADD_TEACHER_TO_SUBJECT,
            payload,
          });
        }
      });
      return res;
    }
    return res;
    // TODO error handler
  })
);
