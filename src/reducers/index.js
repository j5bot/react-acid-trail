import { combineReducers } from 'redux';

import hasher from './hasher';
import acidTrail from './acid-trail';
// import states from './states';

export default combineReducers({
  hasher,
  acidTrail
  // ,
  // states
});
