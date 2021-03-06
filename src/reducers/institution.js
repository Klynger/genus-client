import { concatIdIfNotContain, saveAllHelper } from '../utils/helpers';
import {
  SAVE_INSTITUTION,
  SELECT_INSTITUTION,
  UPDATE_INSTITUTION,
  SAVE_ALL_INSTITUTIONS,
  REMOVE_ALL_INSTITUTIONS,
  SAVE_GRADE_TO_INSTITUTION,
  REMOVE_USER_FROM_INSTITUION,
} from '../actions/actionTypes';

export const NO_INSTUTION_SELECTED = '-1';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
  selectedInstitution: NO_INSTUTION_SELECTED,
};

function institution(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_GRADE_TO_INSTITUTION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.institutionId]: {
            ...state.byId[action.payload.institutionId],
            grades: concatIdIfNotContain(
              state.byId[action.payload.institutionId].grades,
              action.payload.gradeId,
            ),
          },
        },
        allIds: state.allIds,
      };

    case SAVE_INSTITUTION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.institution.id]: {
            ...(state.byId[action.institution.id] ? state.byId[action.institution.id] : {}),
            ...action.institution,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.institution.id),
      };

    case SELECT_INSTITUTION:
      return {
        ...state,
        selectedInstitution: action.id,
      };

    case REMOVE_USER_FROM_INSTITUION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [state.selectedInstitution]: {
            ...state.byId[state.selectedInstitution],
            admins: state.byId[state.selectedInstitution].admins.filter(
              id => id !== action.toBeRemovedId,
            ),
            teachers: state.byId[state.selectedInstitution].teachers.filter(
              id => id !== action.toBeRemovedId,
            ),
          },
        },
        allIds: state.allIds,
      };

    case UPDATE_INSTITUTION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [state.selectedInstitution]: {
            ...state.byId[state.selectedInstitution],
            ...action.institution,
          },
        },
        allIds: state.allIds,
      };

    case SAVE_ALL_INSTITUTIONS:
      return saveAllHelper(action.payload, state);
    case REMOVE_ALL_INSTITUTIONS:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export default institution;
