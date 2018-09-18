import { SAVE_INSTITUTION } from './actionTypes';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateInstitution } from '../queryGenerators/institutionMutations';
import { queryFindInstitutionsByOwner } from '../queryGenerators/institutionQueries';

export const addInstitution = institutionInput => dispatch => (
  requestGraphql(mutationCreateInstitution(institutionInput),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.createInstitution) {
        dispatch({
          type: SAVE_INSTITUTION,
          institution: res.data.data.createInstitution,
        });

        return res;
      }
      return Promise.reject(new Error('400'));
    })
);

export const fetchInstitutionsByOwner = ownerId => dispatch => (
  requestGraphql(queryFindInstitutionsByOwner(ownerId),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.findInstitutionsByOwner) {
        res.data.data.findInstitutionsByOwner.forEach(institution => {
          dispatch({
            type: SAVE_INSTITUTION,
            institution,
          });
        });
        return res;
      }
      console.log('res', res);
      return Promise.reject(new Error('400'));
    })
);
