const CHOOSE_FILES = Symbol('CHOOSE_FILES');
const START_HASH = Symbol('START_HASH');
const FINISH_HASH = Symbol('FINISH_HASH');

export const types = {
  CHOOSE_FILES,
  START_HASH,
  FINISH_HASH
};

export const createChooseFilesActions = (files) => {
  return {
    type:     CHOOSE_FILES,
    payload:  {
      files
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
  createChooseFilesActions,
  createStartHashAction,
  createFinishHashAction,
};

// export const hashFiles = () =>
//   (dispatch, getState) => {
//     dispatch(createStartHashAction());
//
//     const files = getState().hasher.files;
//
//     const hasher = new WorkerFileHasher({
//       files
//     });
//
//     hasher.fileWorkers.forEach(
//       (fileWorker) => dispatch(
//         createFinishHashAction(
//           fileWorker.hash()
//         )
//       )
//     );
//
//   };
//
// export const functions = {
//   hashFiles
// };

export default {
  ...types,
  ...actions
  // ...functions
};
