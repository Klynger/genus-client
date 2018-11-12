import { concatIdIfNotContain } from '../utils/helpers';
import {
  SAVE_DISCUSSION,
  REMOVE_ALL_DISCUSSIONS,
  ADD_REPLY_TO_DISCUSSION,
} from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function discussion(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_DISCUSSION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.discussion.id]: {
            ...(state.byId[action.discussion.id] ? state.byId[action.discussion.id] : {}),
            ...action.discussion,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.discussion.id),
      };
    case ADD_REPLY_TO_DISCUSSION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.discussionId]: {
            ...state.byId[action.payload.discussionId],
            replies: concatIdIfNotContain(
              state.byId[action.payload.discussionId].replies || [],
              action.payload.replyId,
            ),
          },
        },
      };
    case REMOVE_ALL_DISCUSSIONS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default discussion;
