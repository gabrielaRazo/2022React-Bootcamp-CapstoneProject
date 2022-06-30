import { applyMiddleware, createStore } from 'redux';
import roootReducers from './reducers/rootReducers';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas/rootSagas';

import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  roootReducers,
  applyMiddleware(sagaMiddleware),
  composeWithDevTools(),
);

export default store;

sagaMiddleware.run(rootSagas);
