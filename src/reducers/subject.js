import { concatIdIfNotContain, saveAllHelper } from '../utils/helpers';
import {
  SAVE_SUBJECT,
  SAVE_ALL_SUBJECTS,
  REMOVE_ALL_SUBJECTS,
  ADD_TEACHER_TO_SUBJECT,
  ADD_STUDENT_TO_SUBJECT,
  ADD_STUDENTS_TO_SUBJECT,
  ADD_STUDENT_TO_SUBJECTS,
  ADD_STUDENTS_TO_SUBJECTS,
  ADD_DISCUSSION_TO_SUBJECT,
  ADD_EVALUATION_TO_SUBJECT,
  REMOVE_STUDENT_FROM_SUBJECT,
  ADD_STUDENT_SUBJECT_TO_SUBJECT,
} from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function subject(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.subject.id]: {
            ...(state.byId[action.subject.id] ? state.byId[action.subject.id] : {}),
            ...action.subject,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.subject.id),
      };

    case ADD_TEACHER_TO_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.subjectId]: {
            ...state.byId[action.payload.subjectId],
            teachers: concatIdIfNotContain(
              state.byId[action.payload.subjectId].teachers,
              action.payload.teacherId,
            ),
          },
        },
      };

    case ADD_STUDENT_TO_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.subjectId]: {
            ...state.byId[action.payload.subjectId],
            students: concatIdIfNotContain(
              state.byId[action.payload.subjectId].students,
              action.payload.studentId,
            ),
          },
        },
      };

    case ADD_STUDENTS_TO_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.subjectId]: {
            ...state.byId[action.payload.subjectId],
            students: concatIdIfNotContain(
              state.byId[action.payload.subjectId].students,
              action.payload.studentsIds,
            ),
          },
        },
      };

    case ADD_STUDENT_TO_SUBJECTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload.subjects.reduce(
            (result, curId) => ({
              ...result,
              [curId]: {
                ...state.byId[curId],
                students: concatIdIfNotContain(
                  state.byId[curId].students,
                  action.payload.studentId,
                ),
              },
            }),
            {},
          ),
        },
      };

    case ADD_STUDENTS_TO_SUBJECTS:
      return {
        ...state,
        byId: {
          ...state.byId,
        },
      };

    case ADD_DISCUSSION_TO_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.subjectId]: {
            ...state.byId[action.payload.subjectId],
            forum: concatIdIfNotContain(
              state.byId[action.payload.subjectId].forum,
              action.payload.discussionId,
            ),
          },
        },
      };

    case ADD_STUDENT_SUBJECT_TO_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.subjectId]: {
            ...state.byId[action.payload.subjectId],
            studentSubjects: concatIdIfNotContain(
              state.byId[action.payload.subjectId].studentSubjects,
              action.payload.studentSubjectId,
            ),
          },
        },
      };

    case REMOVE_STUDENT_FROM_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.toRemove.subjectId]: {
            ...state.byId[action.toRemove.subjectId],
            students: state.byId[action.toRemove.subjectId].students.filter(
              student => student !== action.toRemove.studentId,
            ),
          },
        },
      };
    case ADD_EVALUATION_TO_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.subjectId]: {
            ...state.byId[action.payload.subjectId],
            evaluations: state.byId[action.payload.subjectId].evaluations.concat(
              action.payload.evaluation,
            ),
          },
        },
      };
    case SAVE_ALL_SUBJECTS:
      return saveAllHelper(action.payload, state);
    case REMOVE_ALL_SUBJECTS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default subject;
