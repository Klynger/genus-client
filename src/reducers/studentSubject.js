import { concatIdIfNotContain } from '../utils/helpers';
import { SAVE_STUDENT_SUBJECT, ADD_EVALUATION_TO_STUDENT_SUBJECT } from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function studentSubject(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_STUDENT_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.studentSubject.id]: {
            ...(state.byId[action.studentSubject.id] ? state.byId[action.studentSubject.id] : {}),
            ...action.studentSubject,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.studentSubject.id),
      };

    case ADD_EVALUATION_TO_STUDENT_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.studentSubjectId]: {
            ...state.byId[action.studentSubjectId],
            evaluations: concatIdIfNotContain(
              state.byId[action.studentSubjectId].evaluations,
              action.evaluationId,
            ),
          },
        },
      };

    default:
      return state;
  }
}

export default studentSubject;
