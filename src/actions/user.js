import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { studentSubjectSchema } from '../models/schema';
import { SAVE_USER, SET_LOGGED_USER, REMOVE_USER_FROM_INSTITUION } from './actionTypes';
import { findUserById, findLoggedUserQuery, loginQuery } from '../queryGenerators/userQueries';
import {
  mutationUpdateUser,
  removerUserFromInstitution,
  mutationCreateUser,
} from '../queryGenerators/userMutations';

export const fetchLoggedUser = () => dispatch =>
  requestGraphql(findLoggedUserQuery(), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.findLoggedUser) {
      dispatch({
        type: SAVE_USER,
        user: res.data.data.findLoggedUser,
      });

      dispatch({
        type: SET_LOGGED_USER,
        id: res.data.data.findLoggedUser.id,
      });

      res.data.data.findLoggedUser.studentSubjectRelations.forEach(obj => {
        obj.id = obj.user.id + obj.subject.id;
      });

      dispatchEntities(res.data.data.findLoggedUser.studentSubjectRelations, dispatch, [
        studentSubjectSchema,
      ]);

      return res;
    }
    return res; // TODO return error
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

export const loginUser = login =>
  requestGraphql(loginQuery(login)).then(res => {
    if (res.data && res.data.data && res.data.data.login) {
      localStorage.setItem('token', res.data.data.login);
    }
    return res;
  });

export const createUserAndLogin = input =>
  requestGraphql(mutationCreateUser(input)).then(res => {
    if (res.data && res.data.data && res.data.data.createUser) {
      const { username, ...login } = input;
      return loginUser(login);
    }
    return res;
  });
