import actions from './actions'

const initialState = {
  city:null,
  coordinates:{
    lat:null,
    lon:null
  },
  currentWeather:null,
  loading: false,
  error:null,
}

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
