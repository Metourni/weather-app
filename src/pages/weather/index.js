import React from 'react'
import {Helmet} from 'react-helmet'
import {useSelector} from "react-redux";

import Search from '../../components/search'
import WeatherDetails from '../../components/weather'
import MapComponent from "../../components/map";

const WeatherPage = () => {
  const {loading,coordinates} = useSelector(state=>state.weather)

  return (
    <div>
      <Helmet title="Search" />
      <div className="air__utils__heading">
        <h5>Weather App</h5>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Search />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <MapComponent
            coordinates={coordinates}
            zoom={13}
            loading={loading}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <WeatherDetails />
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
