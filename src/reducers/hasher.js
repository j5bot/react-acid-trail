import { types } from '../actions';

const defaultState = {
  job:     0,
  files:   [],
  string:  '',
  strings: [],
  hashes:  []
};

const {
  CHOOSE_FILES,
  ENTER_STRING,
  CLEAR,
  START_HASH,
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
      string:  payload.string,
      strings: [
        payload.string
      ]
    };

    break;

  case CLEAR:

    newState = {
      ...newState,
      files:   defaultState.files,
      hashes:  defaultState.hashes,
      string:  defaultState.string,
      strings: defaultState.strings
    };

    break;

  case START_HASH:

    newState = {
      ...newState,
      job: newState.job + 1
    };

    break;

  case FINISH_HASH:

    name = (payload.file && payload.file.name) ||
      (payload.string.length <= 100 ?
        payload.string :
        `${payload.string.substr(0, 72)}...${payload.string.substr(-25)}`);

    newState = {
      ...newState,
      hashes: [
        ...newState.hashes,
        {
          name,
          ...payload,
          job: newState.job
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
