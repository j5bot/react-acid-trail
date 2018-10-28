import { takeEvery } from 'redux-saga/effects';

import WorkerFileHasher from '../modules/WorkerFileHasher';
import { types, actions } from '../actions';

const getFiles = state => state.hasher.files;

export function* hashFiles (dispatch, getState, action) {
  const files = getFiles(getState());

  const hasher = new WorkerFileHasher({
    files
  });

  yield hasher.fileWorker.forEach(
    (fileWorker) => dispatch(
      actions.createFinishHashAction(
        fileWorker.hash()
      )
    )
  );
}

export function* watchStartHash (dispatch, getState) {
  yield takeEvery(types.START_HASH, hashFiles.bind(dispatch, getState));
}

export default {
  hashFiles,
  watchStartHash
};
