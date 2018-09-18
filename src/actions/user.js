import { SAVE_USER, SET_LOGGED_USER } from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { findLoggedUserQuery } from '../queryGenerators/userQueries';

export const fetchLoggedUser = () => dispatch => (
  requestGraphql(findLoggedUserQuery(),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data.findLoggedUser) {
        dispatch({
          type: SAVE_USER,
          user: res.data.data.findLoggedUser,
        });

        dispatch({
          type: SET_LOGGED_USER,
          id: res.data.data.findLoggedUser.id,
        });

        return res;
      }
      return Promise.reject(new Error('400'));
    })
);

export default {};
