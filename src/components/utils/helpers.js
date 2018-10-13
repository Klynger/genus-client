export const DEFAULT_PHOTO_CLASS_SRC = '/static/images/grade-default-img.jpg';

export const concatIdIfNotContain = (allIds, id) => {
  if (allIds.includes(id)) {
    return allIds;
  }

  return allIds.concat([id]);
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

export default {};
