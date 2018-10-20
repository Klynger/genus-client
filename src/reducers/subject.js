import {
  SAVE_SUBJECT, REMOVE_ALL_SUBJECTS, ADD_TEACHER_TO_SUBJECT,
} from '../actions/actionTypes';
import { concatIdIfNotContain } from '../components/utils/helpers';

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
            ...state.byId[action.subject.id] ? state.byId[action.subject.id] : {},
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
            users: concatIdIfNotContain(state.byId[action.payload.subjectId].users,
              action.payload.teacherId),
          },
        },
      };
    case REMOVE_ALL_SUBJECTS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default subject;
