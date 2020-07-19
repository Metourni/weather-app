import API from './api'

import Config from '../config'

const getWeatherByCity= async city =>{
  const params ={
    q:city,
    units:'metric',
    appid:Config.api.key
  }
  return API.get(`${Config.api.baseUrl}/weather`,{params})
    .then(data=>data)
    .catch(error=>{
      console.log("error getting weather",error)
      return null
    })
}

const getWeatherByCoordinates= async (lat,lon) =>{
  const params ={
    lat,
    lon,
    units:'metric',
    appid:Config.api.key
  }
  return API.get(`${Config.api.baseUrl}/weather`,{params})
    .then(data=>data)
    .catch(error=>{
      console.log("error getting weather",error)
      return null
    })
}

export default {
  getWeatherByCity,
  getWeatherByCoordinates,
}

