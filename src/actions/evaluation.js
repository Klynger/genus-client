import { dispatchEntities } from '../utils/helpers';
import { evaluationSchema } from '../models/schema';
import { requestGraphql } from '../utils/HTTPClient';
import { ADD_EVALUATION_TO_STUDENT_SUBJECT } from './actionTypes';
import { mutationCreateEvaluation } from '../queryGenerators/evaluationMutations';

export const createEvaluation = newEvaluation => dispatch => {
  return requestGraphql(
    mutationCreateEvaluation(newEvaluation),
    localStorage.getItem('token'),
  ).then(res => {
    if (res.data.data && res.data.data.createEvaluation) {
      dispatchEntities(res.data.data.createEvaluation, dispatch, evaluationSchema);
      dispatch({
        type: ADD_EVALUATION_TO_STUDENT_SUBJECT,
        payload: {
          studentSubjectId: newEvaluation.userId + newEvaluation.subjectId,
          evaluationId: res.data.data.createEvaluation.id,
        },
      });
    } else {
      // TODO
    }
    return res;
  });
};

export default {};
