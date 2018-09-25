import { SAVE_INSTITUTION, SELECT_INSTITUTION } from '../actions/actionTypes';

export const NO_INSTUTION_SELECTED = '-1';

const DEFAULT_STATE = {
  byId: {},
  allIds: [],
  selectedInstitution: NO_INSTUTION_SELECTED,
};

function concatIdIfNotContain(allIds, id) {
  if (allIds.includes(id)) {
    return allIds;
  }
  return allIds.concat([id]);
}

function institution(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_INSTITUTION:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.institution.id]: {
            ...state.byId[action.institution.id] ? state.byId[action.institution.id] : {},
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
    default:
      return state;
  }
}

export default institution;
