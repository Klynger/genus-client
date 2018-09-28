import { combineReducers } from 'redux';
import grade from './grade';
import institution from './institution';
import user from './user';

export default combineReducers({
  grade,
  institution,
  user,
});
