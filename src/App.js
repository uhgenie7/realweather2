import React from 'react';
import './App.css';
import Axios from 'axios';
import DisplayData from './components/DisplayData';
import Navbar from './components/Navbar';
import Cloudrain from './img/cloud-rain-heavy-fill.svg';
import CloudLightning from './img/cloud-lightning-rain-fill.svg';
import Drizzle from './img/cloud-drizzle.svg';
import CloudSnow from './img/cloud-snow-fill.svg';
import CloudFog from './img/cloud-fog-fill.svg';
import Brightness from './img/brightness-high-fill.svg';
import Cloud from './img/cloud.svg';

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
    // console.log(this.state.changeIcon);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          this.setState({ coords: newCoords });
          Axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&appid=d943f9271509662f7f579fd2c785114c&units=metric`)
            .then((res) => {
              let weatherCode = res.data.weather[0].id;
              switch (weatherCode) {
                case 200:
                case 201:
                case 202:
                case 210:
                case 211:
                case 212:
                case 221:
                case 230:
                case 231:
                case 232:
                  this.setState({ changeIcon: CloudLightning })
                  break;
                case 300:
                case 301:
                case 302:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 321:
                  this.setState({ changeIcon: Drizzle })
                  break;
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                case 511:
                case 520:
                case 521:
                case 522:
                case 531:
                  // this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  this.setState({ changeIcon: Cloudrain })
                  break;
                case 600:
                case 601:
                case 602:
                case 611:
                case 612:
                case 613:
                case 615:
                case 616:
                case 620:
                case 621:
                case 622:
                  this.setState({ changeIcon: CloudSnow })
                  break;
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 761:
                case 771:
                case 781:
                  this.setState({ changeIcon: CloudFog })
                  break;
                case 800:
                  this.setState({ changeIcon: Brightness })
                  break;
                case 801:
                case 802:
                case 803:
                case 804:
                  this.setState({ changeIcon: Cloud })
                  break;
                default:
                  this.setState({ changeIcon: Brightness })
                  break;
              }
            let weatherData = {
              temperature: res.data.main.temp,
              description: res.data.weather[0].description,
              location: res.data.name,
              wind_speed: res.data.wind.speed,
              pressure: res.data.main.pressure,
              humidity: res.data.main.humidity,
              feel_like: res.data.main.feels_like,
              }
              this.setState({ data: weatherData })
          })
      });
    } else {
      console.log('Not supported');
    }
  }

  // weather input 검색 change
  change = (value) => {
    this.setState({ inputData: value });
  }
  
  changeWeather = (e) => {
    e.preventDefault();
    Axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputData}&appid=d943f9271509662f7f579fd2c785114c&units=metric`)
      .then((res) => {
              let weatherCode = res.data.weather[0].id;
              switch (weatherCode) {
                case 200:
                case 201:
                case 202:
                case 210:
                case 211:
                case 212:
                case 221:
                case 230:
                case 231:
                case 232:
                  this.setState({ changeIcon: CloudLightning })
                  break;
                case 300:
                case 301:
                case 302:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 321:
                  this.setState({ changeIcon: Drizzle })
                  break;
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                case 511:
                case 520:
                case 521:
                case 522:
                case 531:
                  // this.setState({ changeIcon: "http://uhj1993.dothome.co.kr/img/cloud-rain-heavy-fill.svg" })
                  this.setState({ changeIcon: Cloudrain })
                  break;
                case 600:
                case 601:
                case 602:
                case 611:
                case 612:
                case 613:
                case 615:
                case 616:
                case 620:
                case 621:
                case 622:
                  this.setState({ changeIcon: CloudSnow })
                  break;
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 761:
                case 771:
                case 781:
                  this.setState({ changeIcon: CloudFog })
                  break;
                case 800:
                  this.setState({ changeIcon: Brightness })
                  break;
                case 801:
                case 802:
                case 803:
                case 804:
                  this.setState({ changeIcon: Cloud })
                  break;
                default:
                  this.setState({ changeIcon: Brightness })
                  break;
              }
              let weatherData = {
              temperature: res.data.main.temp,
              description: res.data.weather[0].description,
              location: res.data.name,
              wind_speed: res.data.wind.speed,
              pressure: res.data.main.pressure,
              humidity: res.data.main.humidity,
              feel_like: res.data.main.feels_like
              // img: res.data.current.weather_icons
              }
              this.setState({ data: weatherData })
          })
      .catch((error) => {
        alert("검색 결과가 없습니다");
        console.log('fail');
    })
  }
              
  render() {
    // console.log(this);
      return(
        <div className="App">
          <div className="container">
            <Navbar changeRegion={this.change} changeWeather={this.changeWeather}/>
            <DisplayData weather={this.state.data} changeIcon={this.state.changeIcon}/>
          </div>
        </div>
      )
    }
}


export default App;
