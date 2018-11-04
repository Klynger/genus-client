import user from './user';
import grade from './grade';
import reply from './reply';
import subject from './subject';
import discussion from './discussion';
import { combineReducers } from 'redux';
import institution from './institution';

export default combineReducers({
  user,
  grade,
  reply,
  subject,
  discussion,
  institution,
});
