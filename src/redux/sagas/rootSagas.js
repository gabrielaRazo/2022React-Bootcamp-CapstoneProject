//Archivo que une todos los archivos Saga
import { all, fork } from 'redux-saga/effects';
import * as dashboardActions from './dashboardSaga';

export default function* rootSaga() {
  var allSagas = Object.assign(dashboardActions);

  yield all([...Object.values(allSagas)].map(fork));
}
