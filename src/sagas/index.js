import { all } from 'redux-saga/effects';

import { watchStartHash } from './hasher';

export function* helloSaga () {
  yield console.log('hello saga!');
}

export function* rootSaga (dispatch, getState) {
  yield all(
    [
      helloSaga(dispatch, getState),
      watchStartHash(dispatch, getState)
    ]
  );
}

export default rootSaga;
