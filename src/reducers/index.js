import { combineReducers } from 'redux';
import institution from './institution';
import user from './user';

export default combineReducers({
  user,
  institution,
});
