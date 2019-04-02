import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { institutionSchema } from '../models/schema';
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

export const addInstitution = institutionInput => dispatch => {
  return requestGraphql(
    mutationCreateInstitution(institutionInput),
    localStorage.getItem('token'),
  ).then(res => {
    let result;
    if (res.data.data && res.data.data.createInstitution) {
      dispatchEntities(res.data.data.createInstitution, dispatch, institutionSchema);
      dispatch({
        type: SELECT_INSTITUTION,
        id: res.data.data.createInstitution.id,
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
      dispatchEntities(res.data.data.joinInstitution, dispatch, institutionSchema);
      dispatch({
        type: SELECT_INSTITUTION,
        id: res.data.data.joinInstitution.id,
      });
    }
    return res;
  });

export const fetchInstitutionsByOwner = () => (dispatch, getState) => {
  return requestGraphql(queryFindInstitutionsByOwner(), localStorage.getItem('token')).then(res => {
    let requestResult;
    if (res.data.data && res.data.data.getInstitutionsFromLoggedUser) {
      res.data.data.getInstitutionsFromLoggedUser.forEach(institution => {
        institution.students.forEach(student => {
          student.studentSubjectRelations.forEach(obj => {
            obj.id = obj.user.id + obj.subject.id;
          });
        });
      });

      dispatchEntities(res.data.data.getInstitutionsFromLoggedUser, dispatch, [institutionSchema]);

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
