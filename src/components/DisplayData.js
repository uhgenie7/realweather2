import React from 'react';
import '../App.css'

function DisplayData(props) {
  // console.log(props.weather);
    const { temperature, description, location, region, country, wind_speed, pressure, precip, humidity, img} = props.weather;

    const changeIcon = props.changeIcon;
  return (
      <div className="weatherInfo">
        <div>
          <h2>{location}<b>{region} , {country}</b></h2>
          <h3>{description}</h3>
        </div>
          <div className="weatherImg">
              <img src={changeIcon} alt={description}></img>
        </div>
        <div>  
          <h3>{temperature}<sup>o</sup>C</h3>
        </div>
        <div className="weatherDetail">
          <div className="detailInfo">
            <p><b>Wind Speed</b>(km/hr)</p>
            <h2>{wind_speed}</h2>
          </div>
          <div className="detailInfo">
            <p><b>Preassure</b>(millibar)</p>
            <h2>{pressure}</h2>
          </div>
          <div className="detailInfo">
            <p><b>Precipitation</b>(mm)</p>
            <h2>{precip}</h2>
          </div>
          <div className="detailInfo">
            <p><b>Humidity</b>(%)</p>
            <h2>{humidity}</h2>
          </div>
        </div>
      </div>
  );
}

export default DisplayData;