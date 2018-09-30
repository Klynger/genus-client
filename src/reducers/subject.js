import { SAVE_SUBJECT, REMOVE_ALL_SUBJECTS } from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function concatIdIfNotContain(allIds, id) {
  if (allIds.includes(id)) {
    return allIds;
  }

  return allIds.concat([id]);
}

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

    case REMOVE_ALL_SUBJECTS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default subject;
