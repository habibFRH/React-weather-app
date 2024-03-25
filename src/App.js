import axios from "axios";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9c0876406ec95ff6dbc709f52fbcc7b0`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url)
        .then((response) => {
          if (response.data.cod === '404') {
            setError(true);
            setData({}); 
          } else {
            setData(response.data);
            setLocation("");
            setError(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError(true);
          setData({}); // Clear data
        });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search for a location"
          type="text"
        />
      </div>
      <div className="container">
        {error && <h1>Undefined place</h1>}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.temp.toFixed()} °C</p> : null}
              {data.sys ? <p className="bold">{data.sys.country}</p> : null}
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity.toFixed()} %</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
