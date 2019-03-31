import { concatIdIfNotContain } from '../utils/helpers';
import { SAVE_EVALUATION } from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function evaluation(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_EVALUATION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.evaluation.id]: {
            ...(state.byId[action.evaluation.id] ? state.byId[action.evaluation.id] : {}),
            ...action.evaluation,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.evaluation.id),
      };
    default:
      return state;
  }
}

export default evaluation;
