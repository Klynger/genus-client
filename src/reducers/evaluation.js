import { concatIdIfNotContain, saveAllHelper } from '../utils/helpers';
import {
  SAVE_EVALUATION,
  SAVE_ALL_EVALUATIONS,
  REMOVE_ALL_EVALUATIONS,
} from '../actions/actionTypes';

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
            ...state.byId[action.evaluation.id],
            ...action.evaluation,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.evaluation.id),
      };
    case SAVE_ALL_EVALUATIONS:
      return saveAllHelper(action.payload, state);
    case REMOVE_ALL_EVALUATIONS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default evaluation;
