import { concatIdIfNotContain } from '../utils/helpers';
import { SAVE_REPLY, ADD_REPLY_TO_REPLY, REMOVE_ALL_REPLIES } from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function reply(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_REPLY:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.reply.id]: {
            ...(state.byId[action.reply.id] ? state.byId[action.reply.id] : {}),
            ...action.reply,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.reply.id),
      };
    case ADD_REPLY_TO_REPLY:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.parentId]: {
            ...state.byId[action.payload.parentId],
            replies: concatIdIfNotContain(
              state.byId[action.payload.parentId].replies,
              action.payload.childId,
            ),
          },
        },
      };
    case REMOVE_ALL_REPLIES:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export default reply;
