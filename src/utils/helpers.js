import { normalize } from 'normalizr';
import { userRoles } from './constants';

export const DEFAULT_PHOTO_CLASS_SRC = '/static/images/grade-default-img.jpg';

export const concatIdIfNotContain = (allIds = [], idsOrId) => {
  if (Array.isArray(idsOrId)) {
    idsOrId.forEach(id => {
      if (!allIds.includes(id)) {
        allIds.push(id);
      }
    });
  } else if (!allIds.includes(idsOrId)) {
    allIds.push(idsOrId);
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

function getSaveAction(entityName) {
  return `SAVE_${entityName.toUpperCase()}`;
}

function getSaveAllAction(entityName) {
  return `SAVE_ALL_${entityName.toUpperCase()}`;
}

function dispatchById(objects, dispatch, entityName, saveAll) {
  if (saveAll) {
    const actionType = getSaveAllAction(entityName);
    const payload = Object.keys(objects).map(id => objects[id]);
    dispatch({
      type: actionType,
      payload,
    });
  } else {
    const actionType = getSaveAction(entityName);
    Object.keys(objects).forEach(id => {
      dispatch({
        type: actionType,
        [entityName]: objects[id],
      });
    });
  }
}

export function dispatchEntities(denormalizedData, dispatch, schema, saveAll = false) {
  const { entities } = normalize(denormalizedData, schema);
  Object.keys(entities).forEach(entityName => {
    dispatchById(entities[entityName], dispatch, entityName, saveAll);
  });
}
