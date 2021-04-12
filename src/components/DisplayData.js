import React from 'react';
import '../App.css'

function DisplayData(props) {
  // console.log(props.weather);
    const { temperature, description, location, wind_speed, pressure, humidity, feel_like} = props.weather;
  const changeIcon = props.changeIcon;
  
  return (
      <div className="weatherInfo">
        <div>
          <h2>{location}</h2>
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
            <p><b>풍속</b>(km/hr)</p>
            <h2>{wind_speed}</h2>
          </div>
          <div className="detailInfo">
            <p><b>대기압</b>(millibar)</p>
            <h2>{pressure}</h2>
          </div>
          <div className="detailInfo">
          <p><b>체감 온도</b></p>
          <h2>{feel_like}</h2>
          </div>
          <div className="detailInfo">
            <p><b>습도</b>(%)</p>
            <h2>{humidity}</h2>
          </div>
        </div>
      </div>
  );
}

export default DisplayData;