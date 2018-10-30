import {
  SAVE_GRADE,
  SAVE_SUBJECT,
  SAVE_SUBJECT_TO_GRADE,
  SAVE_GRADE_TO_INSTITUTION,
  SAVE_USER,
} from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateGrade } from '../queryGenerators/GradeMutations';
import { mutationCreateSubject } from '../queryGenerators/SubjectMutations';
import { queryFindGrade } from '../queryGenerators/GradeQueries';

export const addGrade = gradeInput => dispatch => {
  return requestGraphql(mutationCreateGrade(gradeInput), localStorage.getItem('token')).then(
    res => {
      const result = res;
      if (res.data.data && res.data.data.createGrade) {
        const subjects = res.data.data.createGrade.subjects.map(subject => {
          subject = subject.teachers.map(user => {
            dispatch({
              type: SAVE_USER,
              user,
            });
            return user.id;
          });
          dispatch({
            type: SAVE_SUBJECT,
            subject,
          });

          return subject.id;
        });

        const grade = {
          ...res.data.data.createGrade.subjects,
          subjects: subjects.map(({ id }) => id),
        };
        dispatch({
          type: SAVE_GRADE,
          grade,
        });
      } else {
        // TODO
        // result = Promise.reject(new Error('404'));
      }
      return result;
    },
  );
};

export const addSubjectToGrade = subjectInput => dispatch =>
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

export const createGrade = newGrade => dispatch => {
  return requestGraphql(mutationCreateGrade(newGrade), localStorage.getItem('token')).then(res => {
    const result = res;
    if (res.data.data && res.data.data.createGrade) {
      const grade = {
        ...res.data.data.createGrade,
        subjects: res.data.data.createGrade.subjects.map(subject => {
          subject = {
            ...subject,
            teachers: subject.teachers.map(user => {
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
          return subject.id;
        }),
      };
      dispatch({
        type: SAVE_GRADE,
        grade,
      });
      dispatch({
        type: SAVE_GRADE_TO_INSTITUTION,
        payload: {
          gradeId: res.data.data.createGrade.id,
          institutionId: newGrade.institutionId,
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
      const grade = {
        ...res.data.data.createGrade,
        subjects: res.data.data.createGrade.subjects.map(subject => {
          subject = {
            ...subject,
            teachers: subject.teachers.map(user => {
              dispatch({
                type: SAVE_USER,
                user,
              });
              return user.id;
            }),
          };
          return subject.id;
        }),
      };
      dispatch({
        type: SAVE_GRADE,
        grade,
      });

      result = res;
    } else {
      // TODO
      // result = Promise.reject(new Error('400'));
    }

    return result;
  });
};

export default {};
