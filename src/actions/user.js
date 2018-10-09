import { SAVE_USER, SET_LOGGED_USER } from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { findLoggedUserQuery, getUsersFromInstitutionByRole } from '../queryGenerators/userQueries';

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

export default {};
