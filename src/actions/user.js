import { SAVE_USER, SET_LOGGED_USER, REMOVE_USER_FROM_INSTITUION } from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { findLoggedUserQuery, getUsersFromInstitutionByRole } from '../queryGenerators/userQueries';
import { removerUserFromInstitution } from '../queryGenerators/userMutations';

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

const getUserOfInstitutionByRole = (institutionId, role) => (dispatch) => {
  const input = {
    institutionId,
    role,
  };
  return requestGraphql(getUsersFromInstitutionByRole(input),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data && res.data.data.getUsersFromInstitutionByRole) {
        const users = res.data.data.getUsersFromInstitutionByRole;
        users.forEach(user => {
          dispatch({
            type: SAVE_USER,
            user,
          });
        });

        return res;
      }

      return Promise.reject(new Error('400'));
    });
};

export const getTeacherOfInstitutionId = institutionId =>
                getUserOfInstitutionByRole(institutionId, 'TEACHER');

export const getAdminOfInstitutionId = institutionId =>
                getUserOfInstitutionByRole(institutionId, 'ADMIN');

export const removeUserOfInstitutionId = input => (dispatch) => (
  requestGraphql(removerUserFromInstitution(input),
  localStorage.getItem('token'))
    .then(res => {
        if (res.data.data.removeUserFromInstitution) {
          dispatch({
            type: REMOVE_USER_FROM_INSTITUION,
            toBeRemovedId: input.toBeRemovedId,
          });
        }
      return res;
    })
);

export default {};
