import { types } from '../actions';

const defaultState = {
  files: []
};

export const hasher = (state = defaultState, action) => {
  let newState = state;

  const { type, payload } = action;

  switch (type) {
  case types.CHOOSE_FILES:

    newState = {
      ...newState,
      files: payload.files
    };

    break;
  default:
    break;
  }

  return newState;
};

export default hasher;
