import { SAVE_INSTITUTION, SELECT_INSTITUTION } from './actionTypes';
import { NO_INSTUTION_SELECTED } from '../reducers/institution';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateInstitution } from '../queryGenerators/institutionMutations';
import { queryFindInstitutionsByOwner } from '../queryGenerators/institutionQueries';

export const selectInstitution = id => dispatch => {
  dispatch({
    type: SELECT_INSTITUTION,
    id,
  });
};

export const addInstitution = institutionInput => (dispatch, getState) => (
  requestGraphql(mutationCreateInstitution(institutionInput),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.createInstitution) {
        dispatch({
          type: SAVE_INSTITUTION,
          institution: res.data.data.createInstitution,
        });
        if (getState().institution.selectedInstitution === NO_INSTUTION_SELECTED) {
          dispatch({
            type: SELECT_INSTITUTION,
            id: res.data.data.createInstitution.id,
          });
        }
        return res;
      }
      return Promise.reject(new Error('400'));
    })
);

export const fetchInstitutionsByOwner = ownerId => (dispatch, getState) => (
  requestGraphql(queryFindInstitutionsByOwner(ownerId),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.findInstitutionsByOwner) {
        res.data.data.findInstitutionsByOwner.forEach(institution => {
          dispatch({
            type: SAVE_INSTITUTION,
            institution,
          });
          if (getState().institution.selectedInstitution === NO_INSTUTION_SELECTED) {
            dispatch({
              type: SELECT_INSTITUTION,
              id: institution.id,
            });
          }
        });
        return res;
      }
      return Promise.reject(new Error('400'));
    })
);
