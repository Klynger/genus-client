import { SAVE_USER, SET_LOGGED_USER, REMOVE_USER, REMOVE_ALL_USERS } from '../actions/actionTypes';
import { concatIdIfNotContain } from '../components/utils/helpers';

export const NO_USER_LOGGED = '-333';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
  loggedUserId: NO_USER_LOGGED,
};

function user(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.user.id]: {
            ...(state.byId[action.user.id] ? state.byId[action.user.id] : {}),
            ...action.user,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.user.id),
      };

    case REMOVE_USER:
      return {
        ...state,
        byId: action.userList.reduce(
          (obj, key) => ({
            ...obj,
            [key]: state.byId[key],
          }),
          {},
        ),
        allIds: action.userList,
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
