import { useEffect, useState } from 'react'
import './App.css'
import proptypes from "prop-types";

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

WeatherDetails.proptypes ={
  icon: proptypes.string.isRequired,
  temp: proptypes.number.isRequired,
  city: proptypes.string.isRequired,
  country: proptypes.string.isRequired,
  humidity: proptypes.number.isRequired,
  wind: proptypes.number.isRequired,
  lat: proptypes.number.isRequired,
  lag: proptypes.number.isRequired,
}

function App() {
  let api_key="4b9b8688eca407ea3546cf525c8f03cb";
  const [text,setText]=useState("Erode");
  const [icon, setIcon] = useState(snowicon);
  const [temp, setTemp] = useState(0); 
  const [city, setCity] = useState("Erode");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [citynotfound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const[error,setError] = useState(null);

  const weathericonmap = {
    "01d" : clearicon,
    "01n" : clearicon,
    "02d" : cloudicon,
    "02n" : cloudicon,
    "03d" : drizzleicon,
    "03n" : drizzleicon,
    "04d" : drizzleicon,
    "04n" : drizzleicon,
    "09d" : rainicon,
    "09n" : rainicon,
    "10d" : rainicon,
    "10n" : rainicon,
    "13d" : snowicon,
    "13n" : snowicon,
  }
  

  const search=async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=4b9b8688eca407ea3546cf525c8f03cb&units=Metric`;

    try{
      
      let res=await fetch(url);
      let data=await res.json();
      console.log(data);
      if(data.cod==="404"){
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLog(data.coord.lon);
      setLat(data.coord.lat);

      const weathericoncode = data.weather[0].icon;
      setIcon(weathericoncode[weathericoncode] || clearicon);
      setCityNotFound(false);

    }catch(error){
      console.error("An Error Occurred:",error.message);
      setError("An error occured while fetching weather data.");
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

  useEffect(function (){
    search()
  },[]);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityinput" placeholder="Enter City" onChange={handlecity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={()=>search()}>
            <img src={searchicon} alt="search" />
          </div>
        </div>
        
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {citynotfound && <div className="city-not-found">City Not Found</div>}

        {!loading && !citynotfound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} wind={wind} humidity={humidity} />}
        <p className="copyright">Designed by <span>KEERTHI</span></p>
      </div>
    </>
  );
}

export default App;
