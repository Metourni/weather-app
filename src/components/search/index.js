import React ,{useState} from 'react'
import {Button, Divider, Input} from 'antd';
import {useDispatch} from "react-redux";

import useCurrentLocation from "../../hooks/useCurrentLocation";
import weatherAction from "../../redux/weather/actions";
import forecastAction from "../../redux/forecast/actions";

const {Search} = Input;
const geolocationOptions = {
  // Using this option you can define when should the location request timeout and
  // call the error callback with timeout message.
  timeout: 1000 * 60 // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
};

const search = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errorMessage, setErrorMessage] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {location, error} = useCurrentLocation(geolocationOptions);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  const searchWithCurrentLocation = () => {
    console.log('Search With Current Location ', error, location);
    if (location && !error) {
      // Initial Value
      dispatch({
        type: weatherAction.GET_WEATHER,
        payload: {
          coordinates: {
            lat: location.latitude,
            lon: location.longitude,
          },
          searchBy: 'coordinates'
        }
      })
      dispatch({
        type: forecastAction.GET_FORECAST,
        payload: {
          coordinates: {
            lat: location.latitude,
            lon: location.longitude,
          },
          searchBy: 'coordinates'
        }
      })
    }else{
      setErrorMessage("Can't get your current location")
    }
  }

  const searchWithCityName = (value) => {
    console.log('Search With City Name:', value);
    if (value && value.length>3){
      // Initial Value
      dispatch({
        type: weatherAction.GET_WEATHER,
        payload: {
          city: value,
          searchBy: 'cityName'
        }
      })
      dispatch({
        type: forecastAction.GET_FORECAST,
        payload: {
          city: value,
          searchBy: 'cityName'
        }
      })
    } else{
      setErrorMessage("Min length is 3.s")
    }
  }

  return (
    <div className="card">
      <div className="card-body text-center">
        <div>
          <Search
            style={{width: 400}}
            placeholder="Select a city"
            onSearch={searchWithCityName}
            required
            minLength={3}
          />
          <div className="text-danger">
            {errorMessage || null}
          </div>

        </div>
        <Divider>OR</Divider>
        <div className="">
          <div>
            <Button
              type="button"
              size="large"
              className="btn btn-primary mr-auto"
              onClick={searchWithCurrentLocation}
              disabled={!location || error}
              icon="search"
            >
              Use my location
            </Button>
          </div>
          <div>
            {location && !error ? (
              <code>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </code>
            ) : (
              <p>Loading...</p>
            )}
            {error && <p>Location Error: {error}</p>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default search;
