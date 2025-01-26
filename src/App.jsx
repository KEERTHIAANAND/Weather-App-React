import { useState } from 'react'
import './App.css'

import searchicon from "./assets/search.png";
import clearicon from "./assets/clear.png";
import cloudicon from "./assets/cloud.png";
import drizzleicon from "./assets/drizzle.png";
import humidityicon from "./assets/humidity1.png";
import rainicon from "./assets/rain.webp";
import snowicon from "./assets/snow.png";
import windicon from "./assets/wind.png";

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="img" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityicon} alt="humidity" className="icon"/>
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windicon} alt="wind" className="icon"/>
          <div className="data">
            <div className="wind-percent">{wind} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  let api_key="e867398c308c968246fe8d4c2203432f";
  const [text,setText]=useState("Erode");
  const [icon, setIcon] = useState(snowicon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("coimbatore");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [citynotfound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const search=async () => {
    setLoading(true);

    let url ="https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=e867398c308c968246fe8d4c2203432f&units=Metric";

    try{
      
      let res=await fetch(url);
      let data=await res.json();
      console.log(data);
      if(data.cod==="404"){
        console.error("City Not Found");
      }
    }catch(error){
      console.error("An Error Occurred:",error.message);
    }finally{
      setLoading(false);
    }
  };

  const handlecity=(e)=>{
    setText(e.target.value);
  };

  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      search();
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityinput" placeholder="Enter City" onChange={handlecity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={()=>search()}>
            <img src={searchicon} alt="search" />
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} wind={wind} humidity={humidity} />
        <p className="copyright">Designed by <span>KEERTHI</span></p>
      </div>
    </>
  );
}

export default App;
