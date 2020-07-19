import React, {useEffect} from 'react';
import {Divider, Skeleton,Row, Col} from 'antd';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";

import weatherAction from "../../redux/weather/actions";
import forecastAction from "../../redux/forecast/actions";

const WeatherDetailsHeader=  props=>{
  const { weather } = props;

  const date = (weather && weather.date && moment().isValid(weather.date)) ? weather.date : "";
  const description = weather.description ? weather.description : "";

  return (
    <div>
      <div className="mb-5">
        <h3 className="">
          {weather.city}, {weather.country}
        </h3>
        {moment(date).format("dddd, MMMM Do YYYY, h:mm A")}
      </div>
      <Row>
        <Col span={8}>
          <div className="d-inline-flex">
            <div className="mx-2 pt-3">
              <i className={`text-success display-1 ${weather.icon_class}`} />
            </div>
            <div className="mx-2">
              <h1 className="text-primary display-1">
                {Math.round(weather.temperature)}&deg;C
              </h1>
              <span className="text-capitalize h2">
                {description}
              </span>
            </div>
          </div>
        </Col>
        <Col span={8} offset={6}>
          <Row gutter={[16, 16]}>
            <Col span={12} className="text-center">
              <h4>{weather.temperature_max}°</h4>
              <span>Hight</span>
            </Col>
            <Col span={12} className="text-center">
              <h4>{weather.wind_speed}mph</h4>
              <span>Wind</span>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12} className="text-center">
              <h4>{weather.temperature_min}°</h4>
              <span>Low</span>
            </Col>
            <Col span={12} className="text-center">
              <h4>{weather.humidity}%</h4>
              <span>Humidity</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const Forecast = (props)=>{
  const { forecast } = props;

  const forecastList = forecast.map((item,index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`forecast-${index}`} className="col-md-12 row my-3 ">
        <div className="col-md-4 text-left">
          {moment(item.dt_txt).format('dddd')}
        </div>
        <div className="col-md-4 text-center">
          <i className={`text-primary ${item.icon_class}`} style={{ fontSize: "24px" }} />
        </div>
        <div className="col-md-4 text-right">
          <span className="temp" style={{ flex: "1 1 0%", textAlign: "right" }}>
            <span className="text-dark">
              {Math.round(item.min)}&deg; - {" "}
            </span>
            <span className="text-dark">
              {Math.round(item.max)}&deg;
            </span>
          </span>
        </div>
      </div>
    )
  })

  return (
    <div className="row px-5">
      {forecastList}
    </div>
  )
}

// todo: add map

const WeatherDetails = () => {

  const weather = useSelector(state=>state.weather);
  const forecast = useSelector(state=>state.forecast);

  const dispatch = useDispatch();

  useEffect(()=>{
    // Initial Value
    dispatch({
      type:weatherAction.GET_WEATHER,
      payload:{city:'Alger'}
    })

    dispatch({
      type:forecastAction.GET_FORECAST,
      payload:{city:'Alger'}
    })

  },[]);

  return (
    <div className="card">
      <div className="card-body text-center">
        <Skeleton loading={weather.loading}>
          {
            !weather.loading && weather.currentWeather?
              <WeatherDetailsHeader weather={weather.currentWeather} />
              :
              null
          }
          {
            !weather.loading && !weather.currentWeather && weather.error?
              <div className="text-danger">{weather.error}</div>
              :
              null
          }
        </Skeleton>
        <Divider />
        <Skeleton loading={forecast.loading}>
          {
            !forecast.loading && forecast.list?
              <Forecast forecast={forecast.list} />
              :
              null
          }
          {
            !forecast.loading && !forecast.list.length <1 && forecast.error?
              <div className="text-danger">{forecast.error}</div>
              :
              null
          }
        </Skeleton>
      </div>
    </div>
  )
}


export default WeatherDetails
