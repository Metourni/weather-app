import API from './api'

import Config from '../config'

const getForecastByCity= async city =>{
  const params ={
    q:city,
    units:'metric',
    appid:Config.api.key
  }
  return API.get(`${Config.api.baseUrl}/forecast`,{params})
    .then(data=>data)
    .catch(error=>{
      console.log("error getting forecast",error)
      return null
    })
}
const getForecastByCoordinates= async (lat,lon) =>{
  const params ={
    lat,
    lon,
    units:'metric',
    appid:Config.api.key
  }
  return API.get(`${Config.api.baseUrl}/forecast`,{params})
    .then(data=>data)
    .catch(error=>{
      console.log("error getting forecast",error)
      return null
    })
}

export default {
  getForecastByCity,
  getForecastByCoordinates
}

