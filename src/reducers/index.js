import user from './user';
import grade from './grade';
import reply from './reply';
import subject from './subject';
import discussion from './discussion';
import institution from './institution';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  grade,
  reply,
  subject,
  discussion,
  institution,
});
