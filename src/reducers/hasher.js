import { types } from '../actions';

const defaultState = {
  job:     0,
  files:   [],
  strings: [],
  hashes:  []
};

const {
  CHOOSE_FILES,
  ENTER_STRING,
  FINISH_HASH
} = types;

export const hasher = (state = defaultState, action) => {
  let newState = state,
      name;

  const { type, payload } = action;

  switch (type) {

  case CHOOSE_FILES:

    newState = {
      ...newState,
      files: payload.files
    };

    break;

  case ENTER_STRING:

    newState = {
      ...newState,
      strings: [
        payload.string
      ]
    };

    break;

  case FINISH_HASH:

    name = (payload.file && payload.file.name) ||
      (payload.string.length <= 15 ?
        payload.string :
        `${payload.string.substr(0, 7)}...${payload.string.substr(-5)}`);

    newState = {
      ...newState,
      job:    newState.job++,
      hashes: [
        ...newState.hashes,
        {
          name,
          ...payload
        }
      ]
    };

    break;

  default:
    break;
  }

  return newState;
};

export default hasher;
