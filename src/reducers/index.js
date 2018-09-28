import { combineReducers } from 'redux';
import grade from './grade';
import institution from './institution';
import subject from './subject';
import user from './user';

export default combineReducers({
  grade,
  institution,
  subject,
  user,
});
