import { takeEvery } from 'redux-saga/effects';

import WorkerHasher from '../modules/WorkerHasher';
import actions from '../actions';

const {
  START_HASH
} = actions;

const {
  createFinishHashAction
} = actions;

const getTitle = state => state.hasher.title;
const getFiles = state => state.hasher.files;
const getStrings = state => state.hasher.strings;

export function* hashFilesAndStrings (dispatch, getState, action) {
  const state = getState();

  const title = getTitle(state);
  const files = getFiles(state);
  const strings = getStrings(state);

  const hasher = new WorkerHasher({
    files,
    strings
  });

  yield hasher.workers.forEach(
    (worker) => {
      const promise = worker.hash();

      promise.then(
        (data) => {
          dispatch(createFinishHashAction({
            title,
            ...data
          }));
        }
      );
    }
  );

}

export function* watchStartHash (dispatch, getState) {
  yield takeEvery(
    START_HASH,
    hashFilesAndStrings,
    dispatch,
    getState
  );
}

export default {
  hashFilesAndStrings,
  watchStartHash
};
