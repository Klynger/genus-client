import { requestGraphql } from '../utils/HTTPClient';
import { findUserById, findLoggedUserQuery } from '../queryGenerators/userQueries';
import { SAVE_USER, SET_LOGGED_USER, REMOVE_USER_FROM_INSTITUION } from './actionTypes';
import { mutationUpdateUser, removerUserFromInstitution } from '../queryGenerators/userMutations';

export const fetchLoggedUser = () => dispatch =>
  requestGraphql(findLoggedUserQuery(), localStorage.getItem('token')).then(res => {
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
  });

export const fetchUserById = id => dispatch =>
  requestGraphql(findUserById(id), localStorage.getItem('token')).then(res => {
    if (res.data && res.data.data.findUser) {
      dispatch({
        type: SAVE_USER,
        user: res.data.data.findUser,
      });
    }
  });

export const updateUser = input => dispatch =>
  requestGraphql(mutationUpdateUser(input), localStorage.getItem('token')).then(res => {
    if (res.data && res.data.data.updateUser) {
      dispatch({
        type: SAVE_USER,
        user: res.data.data.updateUser,
      });
    }
    return res;
  });

export const removeUserOfInstitutionId = input => dispatch =>
  requestGraphql(removerUserFromInstitution(input), localStorage.getItem('token')).then(res => {
    if (res.data.data.removeUserFromInstitution) {
      dispatch({
        type: REMOVE_USER_FROM_INSTITUION,
        toBeRemovedId: input.toBeRemovedId,
      });
    }
    return res;
  });
