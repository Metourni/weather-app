import actions from './actions'

const initialState = {
  list:[],
  loading: false,
  error:null,
}

export default function forecastReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
