import { combineReducers } from 'redux';

import { base } from './base';
import { hasher } from './hasher';

export default combineReducers({
  base,
  hasher
});
