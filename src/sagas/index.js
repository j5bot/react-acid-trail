import { all } from 'redux-saga/effects';

import { watchStartHash } from './hasher';
// import { watchFinishHash } from './states';

export function* rootSaga (dispatch, getState) {
  yield all(
    [
      watchStartHash(dispatch, getState)
      // ,
      // watchFinishHash(dispatch, getState)
    ]
  );
}

export default rootSaga;
