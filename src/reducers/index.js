import user from './user';
import grade from './grade';
import reply from './reply';
import subject from './subject';
import discussion from './discussion';
import evaluation from './evaluation';
import institution from './institution';
import { combineReducers } from 'redux';
import evaluationResult from './evaluationResult';

export default combineReducers({
  user,
  grade,
  reply,
  subject,
  discussion,
  evaluation,
  institution,
  evaluationResult,
});
