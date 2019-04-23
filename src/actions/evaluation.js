import { normalize } from 'normalizr';
import { evaluationSchema } from '../models/schema';
import { requestGraphql } from '../utils/HTTPClient';
import {
  mutationCreateEvaluation,
  mutationEditEvaluation,
} from '../queryGenerators/evaluationMutations';
import {
  SAVE_EVALUATION,
  SAVE_ALL_EVALUATION_RESULTS,
  SAVE_ALL_EVALUATIONS,
  ADD_EVALUATION_TO_SUBJECT,
} from './actionTypes';

export const createEvaluation = newEvaluation => dispatch => {
  return requestGraphql(
    mutationCreateEvaluation(newEvaluation),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data.data && res.data.data.createEvaluation) {
      const { entities } = normalize(res.data.data.createEvaluation, evaluationSchema);
      dispatch({
        type: SAVE_ALL_EVALUATION_RESULTS,
        payload: entities.evaluationResult,
      });
      dispatch({
        type: SAVE_ALL_EVALUATIONS,
        payload: entities.evaluation,
      });
      dispatch({
        type: ADD_EVALUATION_TO_SUBJECT,
        payload: {
          subjectId: newEvaluation.subjectId,
          evaluation: Object.keys(entities.evaluation)[0],
        },
      });
    } else {
      // TODO
    }
    return res;
  });
};

export const editEvaluation = input => dispatch => {
  return requestGraphql(mutationEditEvaluation(input), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.editEvaluation) {
      dispatch({
        type: SAVE_EVALUATION,
        evaluation: res.data.data.editEvaluation,
      });
    } else {
      // TODO
    }
  });
};
