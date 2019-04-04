import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { SAVE_EVALUATION_RESULT } from './actionTypes';
import { evaluationResultSchema } from '../models/schema';
import {
  mutationCreateEvaluationResults,
  mutationEditEvaluationResult,
} from '../queryGenerators/evaluationResultMutations';

export const createEvaluationResults = input => dispatch => {
  return requestGraphql(mutationCreateEvaluationResults(input), localStorage.getItem('token')).then(
    res => {
      if (res.data.data && res.data.data.createEvaluationResults) {
        dispatchEntities(res.data.data.createEvaluationResults, dispatch, [evaluationResultSchema]);
      }

      return res;
    },
  );
};

export const editEvaluationResult = input => dispatch => {
  return requestGraphql(mutationEditEvaluationResult(input), localStorage.getItem('token')).then(
    res => {
      if (res.data.data && res.data.data.editEvaluationResult) {
        dispatch({
          action: SAVE_EVALUATION_RESULT,
          evaluationResult: res.data.data.editEvaluationResult,
        });
      }

      return res;
    },
  );
};
