import { concatIdIfNotContain } from '../utils/helpers';
import {
  SAVE_USER,
  SET_LOGGED_USER,
  REMOVE_USER,
  REMOVE_ALL_USERS,
  READ_NOTIFICATION,
  ADD_STUDENT_SUBJECT_TO_USER,
} from '../actions/actionTypes';

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

    case ADD_STUDENT_SUBJECT_TO_USER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.userId]: {
            ...state.byId[action.userId],
            studentSubjectRelations: concatIdIfNotContain(
              state.byId[action.userId].studentSubjectRelations,
              action.studentSubjectId,
            ),
          },
        },
      };

    case READ_NOTIFICATION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [state.loggedUserId]: {
            ...state.byId[state.loggedUserId],
            notifications: state.byId[state.loggedUserId].notifications.map(notification => {
              if (notification.id === action.id) {
                notification.read = true;
              }

              return notification;
            }),
          },
        },
      };

    case REMOVE_ALL_USERS:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export default user;
