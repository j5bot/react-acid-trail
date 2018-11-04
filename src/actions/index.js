import { actions as baseActions } from './base';
import { actions as hasherActions } from './hasher';
import { actions as acidTrailActions } from './acid-trail';
import { types as baseActionTypes } from './base';
import { types as hasherActionTypes } from './hasher';
import { types as acidTrailActionTypes } from './acid-trail';

export const types = {
  ...baseActionTypes,
  ...hasherActionTypes,
  ...acidTrailActionTypes
};

export const actions = {
  ...baseActions,
  ...hasherActions,
  ...acidTrailActions
};

export default {
  ...types,
  ...actions
};
