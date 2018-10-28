import { actions as baseActions } from './base';
import { actions as hasherActions } from './hasher';
import { types as baseActionTypes } from './base';
import { types as hasherActionTypes } from './hasher';

export const types = {
  ...baseActionTypes,
  ...hasherActionTypes
};

export const actions = {
  ...baseActions,
  ...hasherActions
};

export default {
  ...types,
  ...actions
};
