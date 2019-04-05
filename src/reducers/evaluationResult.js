import { concatIdIfNotContain } from '../utils/helpers';
import { SAVE_EVALUATION_RESULT, REMOVE_ALL_EVALUATION_RESULTS } from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function evaluationResult(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_EVALUATION_RESULT:
      return {
        byId: {
          ...state.byId,
          [action.evaluationResult.id]: {
            ...(state.byId[action.evaluationResult] && state.byId[action.evaluationResult]),
            ...action.evaluationResult,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.evaluationResult.id),
      };
    case REMOVE_ALL_EVALUATION_RESULTS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default evaluationResult;
