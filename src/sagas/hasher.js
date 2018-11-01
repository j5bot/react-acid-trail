import { takeEvery } from 'redux-saga/effects';

import WorkerHasher from '../modules/WorkerHasher';
import { types, actions } from '../actions';

const {
  START_HASH
} = types;

const {
  createFinishHashAction
} = actions;

const getFiles = state => state.hasher.files;
const getStrings = state => state.hasher.strings;

export function* hashFilesAndStrings (action, dispatch, getState) {
  const files = getFiles(getState());
  const strings = getStrings(getState());

  const hasher = new WorkerHasher({
    files,
    strings
  });

  yield hasher.workers.forEach(
    (worker) => {
      const promise = worker.hash();

      promise.then(
        (data) => {
          dispatch(createFinishHashAction(data));
        }
      );
    }
  );

}

export function* watchStartHash (dispatch, getState) {
  yield takeEvery(
    START_HASH,
    (action) => hashFilesAndStrings(action, dispatch, getState)
  );
}

export default {
  hashFilesAndStrings,
  watchStartHash
};
