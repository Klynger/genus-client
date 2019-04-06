import { concatIdIfNotContain, saveAllHelper } from '../utils/helpers';
import {
  SAVE_GRADE,
  SAVE_ALL_GRADES,
  REMOVE_ALL_GRADES,
  SAVE_SUBJECT_TO_GRADE,
} from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function grade(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_GRADE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.grade.id]: {
            ...(state.byId[action.grade.id] ? state.byId[action.grade.id] : {}),
            ...action.grade,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.grade.id),
      };

    case SAVE_SUBJECT_TO_GRADE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.gradeId]: {
            ...state.byId[action.payload.gradeId],
            subjects: concatIdIfNotContain(
              state.byId[action.payload.gradeId].subjects,
              action.payload.subjectId,
            ),
          },
        },
        allIds: state.allIds,
      };
    case SAVE_ALL_GRADES:
      return saveAllHelper(action.payload, state);
    case REMOVE_ALL_GRADES:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export default grade;
