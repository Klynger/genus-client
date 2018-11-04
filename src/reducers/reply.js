import { SAVE_REPLY } from '../actions/actionTypes';
import { concatIdIfNotContain } from '../components/utils/helpers';

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

    default:
      return state;
  }
}

export default reply;
