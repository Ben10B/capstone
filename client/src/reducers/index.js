import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import goalReducer from './goalReducer';
import spriteReducer from './spriteReducer';
import rewardReducer from './rewardReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  goal: goalReducer,
  sprite: spriteReducer,
  reward: rewardReducer,
});