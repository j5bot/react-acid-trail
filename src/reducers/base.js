import { types } from '../actions';

const defaultState = {
  something: 0,
  another:   0
};

export const base = (state = defaultState, action) => {
  let newState = state;

  switch (action.type) {
  default:
  case types.DO_SOMETHING:
  case types.DO_ANOTHER:
    newState = {
      ...state,
      ...action.payload
    };
  }

  return newState;
};
