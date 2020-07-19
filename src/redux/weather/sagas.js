import {all, takeEvery, put, call} from 'redux-saga/effects'
import HttpStatus from 'http-status-codes'
import weatherService from 'services/weather'

import actions from './actions'
import {mapDataToWeatherObject} from '../../helper/weather'

// search for users by keyword
export function* GET_WEATHER({payload}) {
  const {city,coordinates,searchBy} = payload

  // start loading..
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });

  let response;
  if (searchBy==="coordinates"){
    response= yield call(weatherService.getWeatherByCoordinates, coordinates.lat, coordinates.lon)
  }else{
    response = yield call(weatherService.getWeatherByCity, city)
  }
  console.log("getWeather: ", response)
  if (
    response &&
    response.status &&
    response.status === HttpStatus.OK &&
    response.data &&
    Object.entries(response.data).length
  ) {
    const weather = response.data
    const mappedData = mapDataToWeatherObject(weather)
    // return mappedData;

    yield put({
      type: actions.SET_STATE,
      payload: {
        currentWeather: mappedData,
        coordinates:{
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        },
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
    takeEvery(actions.GET_WEATHER, GET_WEATHER),
  ])
}
