import { combineReducers } from 'redux';

import { base } from './base';
import { hasher } from './hasher';
import { acidTrail } from './acid-trail';

export default combineReducers({
  base,
  hasher,
  acidTrail
});
