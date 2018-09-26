import { SAVE_USER, SET_LOGGED_USER, REMOVE_ALL_USERS } from '../actions/actionTypes';

export const NO_USER_LOGGED = null;

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
  loggedUserId: NO_USER_LOGGED,
};

function concatIdIfNotContain(allIds, id) {
  if (allIds.includes(id)) {
    return allIds;
  }
  return allIds.concat([id]);
}

function user(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        [action.user.id]: {
          ...state.byId[action.user.id] ? state.byId[action.user.id] : {},
          ...action.user,
        },
        allIds: concatIdIfNotContain(state.allIds, action.user.id),
      };

    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUserId: action.id,
      };

    case REMOVE_ALL_USERS:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export default user;
