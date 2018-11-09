import { dispatchInstitutionEntities } from './utils';
import { requestGraphql } from '../components/utils/HTTPClient';
import { NO_INSTUTION_SELECTED } from '../reducers/institution';
import { SELECT_INSTITUTION, UPDATE_INSTITUTION } from './actionTypes';
import { queryFindInstitutionsByOwner } from '../queryGenerators/institutionQueries';
import {
  mutationJoinInstitution,
  mutationCreateInstitution,
  mutationUpdateInstitution,
} from '../queryGenerators/institutionMutations';

export const selectInstitution = id => dispatch => {
  dispatch({
    type: SELECT_INSTITUTION,
    id,
  });
};

export const addInstitution = institutionInput => (dispatch, getState) => {
  return requestGraphql(
    mutationCreateInstitution(institutionInput),
    localStorage.getItem('token'),
  ).then(res => {
    let result;
    if (res.data.data && res.data.data.createInstitution) {
      dispatchInstitutionEntities([res.data.data.createInstitution], dispatch);
      dispatch({
        type: SELECT_INSTITUTION,
        id: getState().institution.allIds[getState().institution.allIds.length - 1],
      });
      result = res;
    } else {
      result = Promise.reject(new Error('400'));
    }
    return result;
  });
};

export const joinInstitution = code => dispatch =>
  requestGraphql(mutationJoinInstitution(code), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.joinInstitution) {
      dispatchInstitutionEntities([res.data.data.joinInstitution], dispatch);
    }
    return res;
  });

export const fetchInstitutionsByOwner = () => (dispatch, getState) => {
  return requestGraphql(queryFindInstitutionsByOwner(), localStorage.getItem('token')).then(res => {
    let requestResult;
    if (res.data.data && res.data.data.getInstitutionsFromLoggedUser) {
      dispatchInstitutionEntities(res.data.data.getInstitutionsFromLoggedUser, dispatch);

      const state = getState();
      if (
        state.institution.allIds.length > 0 &&
        state.institution.selectedInstitution === NO_INSTUTION_SELECTED
      ) {
        dispatch({
          type: SELECT_INSTITUTION,
          id: state.institution.allIds[0],
        });
      }

      requestResult = res;
    } else {
      requestResult = Promise.reject(new Error('400'));
    }

    return requestResult;
  });
};

export const updateInstitution = input => dispatch => {
  return requestGraphql(mutationUpdateInstitution(input), localStorage.getItem('token')).then(
    res => {
      if (res.data.data.updateInstitution) {
        dispatch({
          type: UPDATE_INSTITUTION,
          institution: res.data.data.updateInstitution,
        });
      }

      return res;
    },
  );
};
