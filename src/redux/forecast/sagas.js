import {all, takeEvery, put, call} from 'redux-saga/effects'
import HttpStatus from 'http-status-codes'
import forecastService from 'services/forecast'

import actions from './actions'
import {mapDataToWeatherObject} from '../../helper/weather'


export function* GET_FORECAST({payload}) {
  const {city,coordinates,searchBy} = payload
  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })

  let response;

  if (searchBy==="coordinates"){
    response= yield call(forecastService.getForecastByCoordinates, coordinates.lat, coordinates.lon)
  }else{
    response = yield call(forecastService.getForecastByCity, city)
  }
  console.log("getForecast: ", response)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    Object.entries(response.data).length
  ) {
    const result = response.data;
    const forecast = [];
    for (let i = 0; i < result.list.length; i += 8) {
      forecast.push(mapDataToWeatherObject(result.list[i + 4]));
    }
    yield put({
      type: actions.SET_STATE,
      payload: {
        list:forecast,
        loading: false,
        error: ""
      }
    })
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        error: "Can't load data"
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_FORECAST, GET_FORECAST),
  ])
}
