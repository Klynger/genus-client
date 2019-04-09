import {
  REMOVE_ALL_USERS,
  REMOVE_ALL_GRADES,
  REMOVE_ALL_SUBJECTS,
  REMOVE_ALL_EVALUATIONS,
  REMOVE_ALL_INSTITUTIONS,
  REMOVE_ALL_EVALUATION_RESULTS,
  REMOVE_ALL_DISCUSSIONS,
  REMOVE_ALL_REPLIES,
} from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const clearStore = dispatch => {
  dispatch({
    type: REMOVE_ALL_INSTITUTIONS,
  });
  dispatch({
    type: REMOVE_ALL_USERS,
  });
  dispatch({
    type: REMOVE_ALL_REPLIES,
  });
  dispatch({
    type: REMOVE_ALL_DISCUSSIONS,
  });
  dispatch({
    type: REMOVE_ALL_GRADES,
  });
  dispatch({
    type: REMOVE_ALL_SUBJECTS,
  });
  dispatch({
    type: REMOVE_ALL_EVALUATIONS,
  });
  dispatch({
    type: REMOVE_ALL_EVALUATION_RESULTS,
  });
};
