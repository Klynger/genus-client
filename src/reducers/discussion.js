import { SAVE_DISCUSSION, ADD_REPLY_TO_DISCUSSION } from '../actions/actionTypes';
import { concatIdIfNotContain } from '../components/utils/helpers';

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
          [action.discussionId]: {
            ...state.byId[action.discussionId],
            replies: concatIdIfNotContain(state.byId[action.discussionId].replies, action.replyId),
          },
        },
      };
    default:
      return state;
  }
}

export default discussion;
