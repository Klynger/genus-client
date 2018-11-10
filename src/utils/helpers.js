import { normalize } from 'normalizr';

export const DEFAULT_PHOTO_CLASS_SRC = '/static/images/grade-default-img.jpg';

export const concatIdIfNotContain = (allIds, id) => {
  if (allIds.includes(id)) {
    return allIds;
  }
  return allIds.concat([id]);
};

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

function dispatchById(objects, dispatch, entityName) {
  const actionType = getSaveAction(entityName);
  Object.keys(objects).forEach(id => {
    dispatch({
      type: actionType,
      [entityName]: objects[id],
    });
  });
}

export function dispatchEntities(denormalizedData, dispatch, schema) {
  const { entities } = normalize(denormalizedData, schema);
  Object.keys(entities).forEach(entityName => {
    dispatchById(entities[entityName], dispatch, entityName);
  });
}
