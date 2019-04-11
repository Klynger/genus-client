import { normalize } from 'normalizr';
import { userRoles } from './constants';

export const DEFAULT_PHOTO_CLASS_SRC = '/static/images/grade-default-img.jpg';

export const concatIdIfNotContain = (allIds = [], idsOrId) => {
  if (Array.isArray(idsOrId)) {
    idsOrId.forEach(id => {
      if (!allIds.includes(id)) {
        allIds = allIds.concat([id]);
      }
    });
  } else if (!allIds.includes(idsOrId)) {
    allIds = allIds.concat([idsOrId]);
  }
  return allIds;
};

export const phoneRegExp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/; // eslint-disable-line

export function getRoleFromInstitution(id, institution) {
  let role = null;
  if (institution.students.includes(id)) {
    role = userRoles.STUDENT;
  } else if (institution.admins.includes(id)) {
    role = userRoles.ADMIN;
  } else if (institution.teachers.includes(id)) {
    role = userRoles.TEACHER;
  }
  return role;
}

export function isInstitutionAdmin(id, institution) {
  return getRoleFromInstitution(id, institution) === userRoles.ADMIN;
}

export const getFirstInitialsCapitalized = (fullName = '', amountOfInitials = 2) => {
  const names = fullName
    .replace(/\s\s+/g, ' ')
    .split(' ')
    .slice(0, amountOfInitials);

  let output = '';
  names.forEach(name => {
    if (name[0]) {
      output += name[0].toUpperCase();
    }
  });

  return output;
};

export const defaultDialogBreakpoints = () => ({
  dialogRoot: {
    minWidth: '30vw',
  },
  dialogRootXs: {
    width: '100%',
  },
  dialogRootSm: {
    width: '70%',
  },
  dialogRootMd: {
    width: '50%',
  },
  dialogRootLg: {
    width: '40%',
  },
  dialogRootXl: {
    width: '30%',
  },
});

// ----------------------------------------------------------------------

export function saveAllHelper(payload, state) {
  const ids = Object.keys(payload);

  const partialById = ids.reduce(
    (acc, curId) => ({
      ...acc,
      [curId]: {
        ...state.byId[curId],
        ...payload[curId],
      },
    }),
    {},
  );

  const newState = {
    ...state,
    byId: {
      ...state.byId,
      ...partialById,
    },
    allIds: concatIdIfNotContain(state.allIds, ids),
  };
  return newState;
}

function getSaveAllAction(entityName) {
  return `SAVE_ALL_${entityName.toUpperCase()}`;
}

function dispatchById(payload, dispatch, entityName) {
  const actionType = getSaveAllAction(entityName);
  dispatch({
    type: actionType,
    payload,
  });
}

export function dispatchEntities(denormalizedData, dispatch, schema) {
  const { entities } = normalize(denormalizedData, schema);
  Object.keys(entities).forEach(entityName => {
    dispatchById(entities[entityName], dispatch, entityName);
  });
}

// ----------------------------------------------------------------------

export function getUserRole(studentList, adminList, teacherList, userId) {
  let role = 'NO_ROLE';
  if (studentList.some(id => id === userId)) {
    role = 'STUDENT';
  } else if (adminList.some(id => id === userId)) {
    role = 'ADMIN';
  } else if (teacherList.some(id => id === userId)) {
    role = 'TEACHER';
  }
  return role;
}

// ------------------------------------------------------------------------

export const stringToColor = string => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
