import { requestGraphql } from '../utils/HTTPClient';
import { SAVE_EVALUATION_RESULT } from './actionTypes';
import { mutationEditEvaluationResult } from '../queryGenerators/evaluationResultMutations';

// eslint-disable-next-line import/prefer-default-export
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
