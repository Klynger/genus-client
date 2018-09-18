import { SAVE_INSTITUTION } from '../actions/actionTypes';

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

function institution(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_INSTITUTION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.institution.id]: {
            ...state.byId[action.institution.id] ? state.byId[action.institution.id] : {},
            ...action.institution,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.institution.id),
      };
    default:
      return state;
  }
}

export default institution;
