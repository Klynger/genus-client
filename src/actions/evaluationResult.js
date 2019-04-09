import { requestGraphql } from '../utils/HTTPClient';
import { SAVE_EVALUATION_RESULT } from './actionTypes';
import { mutationUpdateEvaluationResults } from '../queryGenerators/evaluationResultMutations';

// eslint-disable-next-line import/prefer-default-export
export const editEvaluationResult = input => dispatch => {
  return requestGraphql(
    mutationUpdateEvaluationResults([input]),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data.data && res.data.data.updateEvaluationResults) {
      dispatch({
        type: SAVE_EVALUATION_RESULT,
        evaluationResult: res.data.data.updateEvaluationResults,
      });
    }
    return res;
  });
};
