import { requestGraphql } from '../components/utils/HTTPClient';
import {
  SAVE_USER,
  SAVE_SUBJECT,
  UPDATE_SUBJECT,
  SAVE_SUBJECT_TO_GRADE,
  ADD_TEACHER_TO_SUBJECT,
  ADD_STUDENT_TO_SUBJECT,
} from './actionTypes';
import {
  mutationCreateSubject,
  mutationUpdateSubject,
  mutationAddTeacherToSubject,
  mutationAddStudentToSubject,
} from '../queryGenerators/SubjectMutations';

export const saveSubject = subjectInput => dispatch =>
  requestGraphql(mutationCreateSubject(subjectInput), localStorage.getItem('token')).then(res => {
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
  });

export const addTeacherToSubject = payload => dispatch =>
  requestGraphql(mutationAddTeacherToSubject(payload), localStorage.getItem('token')).then(res => {
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
  });

export const updateSubject = payload => dispatch =>
  requestGraphql(mutationUpdateSubject(payload), localStorage.getItem('token')).then(res => {
    if (res.data.data.updateSubject) {
      dispatch({
        type: UPDATE_SUBJECT,
        payload,
      });
    }
    return res;
  });

export const addStudentToSubject = payload => dispatch =>
  requestGraphql(mutationAddStudentToSubject(payload), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.addStudentToSubject) {
      const students = res.data.data.addStudentToSubject.students;

      students.forEach(user => {
        if (user.id === payload.studentId) {
          dispatch({
            type: ADD_STUDENT_TO_SUBJECT,
            payload,
          });
        }
      });
    }

    return res;
  });
