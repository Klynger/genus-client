import { SAVE_EVALUATION } from './actionTypes';
import { dispatchEntities } from '../utils/helpers';
import { evaluationSchema } from '../models/schema';
import { requestGraphql } from '../utils/HTTPClient';
import {
  mutationCreateEvaluation,
  mutationEditEvaluation,
} from '../queryGenerators/evaluationMutations';

export const createEvaluation = newEvaluation => dispatch => {
  return requestGraphql(
    mutationCreateEvaluation(newEvaluation),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data.data && res.data.data.createEvaluation) {
      dispatchEntities(res.data.data.createEvaluation, dispatch, evaluationSchema);
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
