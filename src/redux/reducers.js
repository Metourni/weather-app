import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import settings from './settings/reducers'
import weather from './weather/reducers'
import forecast from './forecast/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings,
    weather,
    forecast,
  })
