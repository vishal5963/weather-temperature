import React, { Component } from "react";
import Weather from "./Weather";
import TableData from "./TableData";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Tabs, Tab} from 'react-bootstrap-tabs';

// const apiKey = "8ddceeacaf8b95fe943c88fc8389dee0";
const apiKey = "0ed71d44b296d4205eac6c7af9ae4b2c";

const TitleHeader = () => {
  return(
    <div>
      <h1 className="title-container__title">Weather Finder</h1>
    </div>
  )
}

const Title = () => {
  return (
    <div>
      <TitleHeader />
      <h3 className="title-container__subtitle">
        Find out temperature, conditions and more...
      </h3>
    </div>
  );
};

const Form = ({ onWeather }) => {
  console.log("onWeather", onWeather)
  return (
    <form onSubmit={e => onWeather(e)}>
      <input type="text" name="city" placeholder="City..." />
      <input type="text" name="country" placeholder="Country..." />
      <button className="form-button">get Weather</button>
    </form>
  );
};

class App extends Component { 
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    temp_arr: [],
    activeTab: 0
  };
  getWeather = async e => {
    e.preventDefault();
    console.log("************")
    const city = e.currentTarget.elements.city.value;
    const country = e.currentTarget.elements.country.value;
    if (city && country) {
      try {
        const apiCall = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );
        const { main, sys, name, weather } = await apiCall.json();
        this.setState({
          temperature: main.temp,
          city: name,
          country: sys.country,
          humidity: main.humidity,
          description: weather[0].description,
          error: ""
        });
        
      } catch (ex) {
        console.log(ex.message);
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "please enter a valid values."
      });
    }
  };
  
  getThreeHourlyWeather = async e => {
    e.preventDefault();
    console.log("**getThreeHourlyWeather**********", apiKey)
    const city = e.currentTarget.elements.city.value;
    const country = e.currentTarget.elements.country.value;
    if (city && country) {
      try {
        const apiCall1 = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}`
        );
        // const { main, sys, name, weather } = await apiCall1.json();
        const three_hourly_weather = await apiCall1.json();
        console.log( three_hourly_weather );
        this.setState({
          city: three_hourly_weather.city.name,
          country: three_hourly_weather.city.country,
          temp_arr: three_hourly_weather.list
        });
      console.log(this.state.city, "========");
        
      } catch (ex) {
        console.log(ex.message);
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "please enter a valid values."
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container" style={{ width: "100%" }}>    
              <div className="row">
                <div className="col-xs-6 title-container">
                  {/* <Title /> */}
                </div>
                <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                  <Tab label="Current">
                    <div className="col-xs-7 form-container">
                      <Form onWeather={this.getWeather} />
                      <Weather
                        temperature={this.state.temperature}
                        city={this.state.city}
                        country={this.state.country}
                        humidity={this.state.humidity}
                        description={this.state.description}
                        error={this.state.error}
                      />
                    </div>
                  </Tab>
                  <Tab label="3 Hourly">
                    <div className="col-xs-7 form-container">
                      <Form onWeather={this.getThreeHourlyWeather.bind(this)} />
                      <TableData temp_arr={this.state.temp_arr} city={this.state.city} country={this.state.country}/>
                    </div>
                  </Tab>
                </Tabs>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
