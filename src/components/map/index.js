import React from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {Spin} from "antd";

const MapComponent = (props)=>{

  const {coordinates:{lat,lon},zoom=13,loading} = props;

  const position = [lat, lon];

  return (
    <div className="card">
      <div className="card-body text-center">
        <Spin spinning={loading}>
          {
            !loading && lat && lon ?
              <Map center={position} zoom={zoom}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </Map>
              :
              null
          }
        </Spin>
      </div>
    </div>
  )
}

export default MapComponent;
