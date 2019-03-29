import { dispatchEntities } from '../utils/helpers';
import { evaluationSchema } from '../models/schema';
import { requestGraphql } from '../utils/HTTPClient';
import { mutationCreateEvaluation } from '../queryGenerators/evaluationMutations';

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

export default {};
