import React from 'react';
import './App.css';
import Axios from 'axios';
import DisplayData from './components/DisplayData';
import Navbar from './components/Navbar';

class App extends React.Component {
  state = {
    coords: {
      latitude: 37,
      longitude: 127
    },
    data: {},
    inputData: "",
    changeIcon: [],
  }


  componentDidMount() {
    console.log(this.state.changeIcon);
    // console.log('render mount');
    if (navigator.geolocation) {
      // console.log('supported');
      // https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API
        navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
          // 변화되는 newCoords
          let newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          // 경도 위도가 바뀌었다면? setState({state의 coords에 newCoords 대체})
          this.setState({ coords: newCoords });
          // console.log(this.state.coords);
          // 
          Axios
            .get(`http://api.weatherstack.com/current?access_key=ee067797f36d821de901016b22d25888&query=${this.state.coords.latitude},${this.state.coords.longitude}`)
            .then((res) => {
              let weatherCode = res.data.current.weather_code;
              switch (weatherCode) {
                case 113:
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/brightness-high-fill.svg" })
                  break;
                case 116:
                  // this.setState({ changeIcon: "Partly cloudy" })
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud.svg" })
                  break;
                case 119: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/clouds-fill.svg" })
                  break;
                case 122: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/clouds-fill.svg" })
                  break;
                case 143: 
                  this.setState({ changeIcon: "Mist" })
                  break;
                case 176: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  break;
                case 179: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-snow-heavy-fill.svg" })
                  break;
                case 182: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-sleet-fill.svg" })
                  break;
                case 185: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/snow2.svg" })
                  break;
                case 200: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-lightning-fill.svg" })
                  break;
                case 227: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-snow-heavy-fill.svg" })
                  break;
                case 230: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-snow-heavy-fill.svg" })
                  break;
                case 248: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-fog-fill.svg" })
                  break;
                case 260: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-fog-fill.svg" })
                  break;
                case 263: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 266: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 281: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 284: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 293: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-lightning-rain-fill.svg" })
                  break;
                case 296: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-lightning-rain-fill.svg" })
                  break;
                case 299: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle.svg" })
                  break;
                case 302: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle.svg" })
                  break;
                case 305: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  break;
                case 308: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  break;
                case 311: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-sun-fill.svg" })
                  break;
                default:
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/brightness-high-fill.svg" })
                  break;
              }
            let weatherData = {
              temperature: res.data.current.temperature,
              description: res.data.current.weather_descriptions[0],
              location: res.data.location.name,
              region: res.data.location.region,
              country: res.data.location.country,
              wind_speed: res.data.current.wind_speed,
              pressure: res.data.current.pressure,
              precip: res.data.current.precip,
              humidity: res.data.current.humidity,
              img: res.data.current.weather_icons
              // img: this.changeIcon
              }
              // code: res.data.current.weather_code를 읽어와서 code에 맞는 string을 data에 넣어줌...
              this.setState({ data: weatherData })
              // this.setState({ changeIcon: weatherCode });
          })
      });
    } else {
      console.log('Not supported');
    }
  }

  // weather input 검색 change
  change = (value) => {
    // console.log(value);
    this.setState({ inputData: value });
    // console.log(this.state.inputData);
    // this.state.inputData을 api의 쿼리에 넣어줄 거임
  }
  
  changeWeather = (e) => {
    e.preventDefault();
    // Navbar.js 의 onSubmit을 막아준다.
    // const checkLocation = {}

    Axios
      .get(`http://api.weatherstack.com/current?access_key=ee067797f36d821de901016b22d25888&query=${this.state.inputData}`)
      .then((res) => {
              let weatherCode = res.data.current.weather_code;
              switch (weatherCode) {
                case 113:
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/brightness-high-fill.svg" })
                  break;
                case 116:
                  // this.setState({ changeIcon: "Partly cloudy" })
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud.svg" })
                  break;
                case 119: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/clouds-fill.svg" })
                  break;
                case 122: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/clouds-fill.svg" })
                  break;
                case 143: 
                  this.setState({ changeIcon: "Mist" })
                  break;
                case 176: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  break;
                case 179: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-snow-heavy-fill.svg" })
                  break;
                case 182: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-sleet-fill.svg" })
                  break;
                case 185: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/snow2.svg" })
                  break;
                case 200: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-lightning-fill.svg" })
                  break;
                case 227: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-snow-heavy-fill.svg" })
                  break;
                case 230: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-snow-heavy-fill.svg" })
                  break;
                case 248: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-fog-fill.svg" })
                  break;
                case 260: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-fog-fill.svg" })
                  break;
                case 263: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 266: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 281: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 284: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle-fill.svg" })
                  break;
                case 293: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-lightning-rain-fill.svg" })
                  break;
                case 296: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-lightning-rain-fill.svg" })
                  break;
                case 299: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle.svg" })
                  break;
                case 302: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-drizzle.svg" })
                  break;
                case 305: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  break;
                case 308: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  break;
                case 311: 
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-sun-fill.svg" })
                  break;
                default:
                  this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/brightness-high-fill.svg" })
                  break;
              }
            let weatherData = {
              temperature: res.data.current.temperature,
              description: res.data.current.weather_descriptions[0],
              location: res.data.location.name,
              region: res.data.location.region,
              country: res.data.location.country,
              wind_speed: res.data.current.wind_speed,
              pressure: res.data.current.pressure,
              precip: res.data.current.precip,
              humidity: res.data.current.humidity,
              // img: res.data.current.weather_icons
              // img: this.changeIcon
              }
        this.setState({ data: weatherData })
      })
      .catch((error) => {
        alert("검색 결과가 없습니다");
        console.log('fail');
    })
  }
              
  //   if (true) {
  //     console.log('hello!');
  //     console.log(this.state.inputData);
  //   } else {
       
  //   }          
  // }

  render() {
    // console.log(this);
      return(
        <div className="App">
          <div className="container">
            <Navbar changeRegion={this.change} changeWeather={this.changeWeather}/>
            <DisplayData weather={this.state.data} changeIcon={this.state.changeIcon} />
          </div>
        </div>
      )
    }
}


export default App;
