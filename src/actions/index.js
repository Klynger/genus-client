import { REMOVE_ALL_INSTITUTIONS, REMOVE_ALL_USERS } from './actionTypes';

export const clearStore = dispatch => {
  dispatch({
    type: REMOVE_ALL_INSTITUTIONS,
  });
  dispatch({
    type: REMOVE_ALL_USERS,
  });
};

export default {};
