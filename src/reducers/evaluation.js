import { concatIdIfNotContain } from '../utils/helpers';
import {
  SAVE_EVALUATION,
  SAVE_ALL_EVALUATIONS,
  REMOVE_ALL_EVALUATIONS,
} from '../actions/actionTypes';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
};

function saveAllEvaluationsHelper(state, evaluations) {
  const allIds = state.allIds;
  const byId = evaluations.reduce((acc, curEvaluation) => {
    concatIdIfNotContain(allIds, curEvaluation.id);
    if (acc[curEvaluation.id]) {
      acc[curEvaluation.id] = {
        ...acc[curEvaluation.id],
        ...curEvaluation,
      };
    } else {
      acc[curEvaluation.id] = curEvaluation;
    }

    return acc;
  }, state.byId);

  const newState = {
    byId: {
      ...byId,
    },
    allIds,
  };

  return newState;
}

function evaluation(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_EVALUATION:
      return {
        byId: {
          ...state.byId,
          [action.evaluation.id]: {
            ...(state.byId[action.evaluation.id] ? state.byId[action.evaluation.id] : {}),
            ...action.evaluation,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.evaluation.id),
      };
    case SAVE_ALL_EVALUATIONS:
      return saveAllEvaluationsHelper(state, action.payload);
    case REMOVE_ALL_EVALUATIONS:
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default evaluation;
