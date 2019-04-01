import { dispatchEntities } from '../utils/helpers';
import { evaluationSchema } from '../models/schema';
import { requestGraphql } from '../utils/HTTPClient';
import { mutationCreateEvaluation } from '../queryGenerators/evaluationMutations';
import { ADD_EVALUATION_TO_STUDENT_SUBJECT, SAVE_EVALUATION } from './actionTypes';

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

export const createEvaluations = evaluationInputs => dispatch => {
  return Promise.all(
    evaluationInputs.map(evaluationInput => {
      return requestGraphql(
        mutationCreateEvaluation(evaluationInput),
        localStorage.getItem('token'),
      );
    }),
  ).then(responses => {
    responses.map((res, i) => {
      if (res.data.data.createEvaluation) {
        const evaluationInput = evaluationInputs[i];
        dispatch({
          type: SAVE_EVALUATION,
          evaluation: res.data.data.createEvaluation,
        });
        dispatch({
          type: ADD_EVALUATION_TO_STUDENT_SUBJECT,
          payload: {
            studentSubjectId: evaluationInput.userId + evaluationInput.subjectId,
            evaluationId: res.data.data.createEvaluation.id,
          },
        });
        return res.data.data.createEvaluation;
      }
      // TODO treat errors
      return {
        id: '-1',
        result: 1,
        name: 'Error Evaluation',
      };
    });
    return responses;
  });
};

export default {};
