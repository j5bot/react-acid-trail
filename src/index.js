import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';
import saga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(
      logger,
      sagaMiddleware,
      promiseMiddleware
    )
  )
);

sagaMiddleware.run(saga, store.dispatch, store.getState);

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>, document.getElementById('root'));
