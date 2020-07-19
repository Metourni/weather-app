import { all } from 'redux-saga/effects'
import settings from './settings/sagas'
import weather from './weather/sagas'
import forecast from './forecast/sagas'

export default function* rootSaga() {
  yield all([
    settings(),
    weather(),
    forecast(),
  ])
}
