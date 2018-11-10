import { normalize } from 'normalizr';
import { institutionSchema, gradeSchema } from '../models/schema';
import {
  SAVE_USER,
  SAVE_GRADE,
  SAVE_REPLY,
  SAVE_SUBJECT,
  SAVE_DISCUSSION,
  SAVE_INSTITUTION,
} from './actionTypes';

export function dispatchGradeEntities(grades, dispatch) {
  const {
    entities: { grade: gradesById, subject: subjectsById, institution: institutionsById },
    result: gradeIds,
  } = normalize(grades, [gradeSchema]);

  if (subjectsById) {
    Object.keys(subjectsById).forEach(id => {
      dispatch({
        type: SAVE_SUBJECT,
        subject: subjectsById[id],
      });
    });
  }

  if (institutionsById) {
    Object.keys(institutionsById).forEach(id => {
      dispatch({
        type: SAVE_INSTITUTION,
        institution: institutionsById[id],
      });
    });
  }

  gradeIds.forEach(id => {
    dispatch({
      type: SAVE_GRADE,
      grade: gradesById[id],
    });
  });
}

export function dispatchInstitutionEntities(institutions, dispatch) {
  const {
    entities: {
      user: usersById,
      grade: gradesById,
      reply: repliesById,
      subject: subjectsById,
      discussion: discussionsById,
      institution: institutionsById,
    },
    result: institutionIds,
  } = normalize(institutions, [institutionSchema]);

  if (usersById) {
    Object.keys(usersById).forEach(id => {
      dispatch({
        type: SAVE_USER,
        user: usersById[id],
      });
    });
  }

  if (gradesById) {
    Object.keys(gradesById).forEach(id => {
      dispatch({
        type: SAVE_GRADE,
        grade: gradesById[id],
      });
    });
  }

  if (subjectsById) {
    Object.keys(subjectsById).forEach(id => {
      dispatch({
        type: SAVE_SUBJECT,
        subject: subjectsById[id],
      });
    });
  }

  if (repliesById) {
    Object.keys(repliesById).forEach(id => {
      dispatch({
        type: SAVE_REPLY,
        reply: repliesById[id],
      });
    });
  }

  if (discussionsById) {
    Object.keys(discussionsById).forEach(id => {
      dispatch({
        type: SAVE_DISCUSSION,
        discussion: discussionsById[id],
      });
    });
  }

  institutionIds.forEach(id => {
    const institution = institutionsById[id];

    dispatch({
      type: SAVE_INSTITUTION,
      institution,
    });
  });
}
