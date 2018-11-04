const CHOOSE_FILES = Symbol('CHOOSE_FILES');
const ENTER_STRING = Symbol('ENTER_STRING');
const START_HASH = Symbol('START_HASH');
const FINISH_HASH = Symbol('FINISH_HASH');

export const types = {
  CHOOSE_FILES,
  ENTER_STRING,
  START_HASH,
  FINISH_HASH
};

export const createChooseFilesAction = (files) => {
  return {
    type:     CHOOSE_FILES,
    payload:  {
      files
    }
  };
};

export const createEnterStringAction = (string) => {
  return {
    type:     ENTER_STRING,
    payload:  {
      string
    }
  };
};

export const createStartHashAction = () => {
  return {
    type:     START_HASH,
    payload:  {
      start: true
    }
  };
};

export const createFinishHashAction = (payload) => {
  return {
    type:     FINISH_HASH,
    payload
  };
};

export const actions = {
  createChooseFilesAction,
  createEnterStringAction,
  createStartHashAction,
  createFinishHashAction,
};

export default {
  ...types,
  ...actions
};
