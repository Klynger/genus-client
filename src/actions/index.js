import { REMOVE_ALL_INSTITUTIONS, REMOVE_ALL_USERS, REMOVE_ALL_GRADES } from './actionTypes';

export const clearStore = dispatch => {
  dispatch({
    type: REMOVE_ALL_INSTITUTIONS,
  });
  dispatch({
    type: REMOVE_ALL_USERS,
  });
  dispatch({
    type: REMOVE_ALL_GRADES,
  });
};

export default {};
