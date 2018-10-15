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

export const removeUserOfInstitutionId = input => (dispatch, getState) => (
  requestGraphql(removerUserFromInstitution(input),
  localStorage.getItem('token'))
    .then(res => {
        let result = res;
        if (res.data.data.removeUserFromInstitution) {
          const selectedInstitution = getState().institution.selectedInstitution;
          const admins = getState().institution.byId[selectedInstitution].admins
                          .filter(id => (id !== input.toBeRemovedId));
          const teachers = getState().institution.byId[selectedInstitution].teachers
                          .filter(id => (id !== input.toBeRemovedId));
          dispatch({
            type: REMOVE_USER_FROM_INSTITUION,
            users: {
              admins,
              teachers,
            },
          });
        } else {
          result = Promise.reject(new Error('400'));
        }
      return result;
    })
);

export default {};
