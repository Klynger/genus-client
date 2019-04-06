import { subjectSchema } from '../models/schema';
import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { queryFindSubjectById } from '../queryGenerators/subjectQueries';
import {
  UPDATE_SUBJECT,
  SAVE_SUBJECT_TO_GRADE,
  ADD_TEACHER_TO_SUBJECT,
  ADD_STUDENT_TO_SUBJECT,
  ADD_STUDENT_TO_SUBJECTS,
} from './actionTypes';
import {
  mutationCreateSubject,
  mutationUpdateSubject,
  mutationAddTeacherToSubject,
  mutationAddStudentToSubject,
  mutationAddStudentToSubjectsInGrade,
} from '../queryGenerators/SubjectMutations';

export const findSubjectById = subjectId => dispatch => {
  return requestGraphql(queryFindSubjectById(subjectId), localStorage.getItem('token')).then(
    res => {
      if (res.data.data && res.data.data.findSubjectById) {
        dispatchEntities(res.data.data.findSubjectById, dispatch, subjectSchema);
      }
      return res;
    },
  );
};

export const saveSubject = subjectInput => dispatch =>
  requestGraphql(mutationCreateSubject(subjectInput), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.createSubject) {
      dispatchEntities(res.data.data.createSubject, dispatch, subjectSchema);

      dispatch({
        type: SAVE_SUBJECT_TO_GRADE,
        payload: {
          gradeId: subjectInput.gradeId,
          subjectId: res.data.data.createSubject.id,
        },
      });
    }
  });

export const addTeacherToSubject = payload => dispatch =>
  requestGraphql(mutationAddTeacherToSubject(payload), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.addTeacherToSubject) {
      dispatch({
        type: ADD_TEACHER_TO_SUBJECT,
        payload,
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
      dispatch({
        type: ADD_STUDENT_TO_SUBJECT,
        payload,
      });
    }
    return res;
  });

export const addStudentToSubjectsInGrade = input => dispatch =>
  requestGraphql(mutationAddStudentToSubjectsInGrade(input), localStorage.getItem('token')).then(
    res => {
      if (res.data.data && res.data.data.addStudentToSubjectsInGrade) {
        const subjects = res.data.data.addStudentToSubjectsInGrade.map(({ id }) => id);
        dispatch({
          type: ADD_STUDENT_TO_SUBJECTS,
          payload: {
            subjects,
            studentId: input.studentId,
          },
        });
      }
      return res;
    },
  );
