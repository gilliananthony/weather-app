import React , {useState , useEffect} from "react";
import "./App.css";
import moment from 'moment'
import {format} from 'date-fns';
import Map from "./component/map";
const api = {
  key: "fff592fae2e8ed5526bbf703869c8305",
  base: "https://api.openweathermap.org/data/2.5/",
};


function App() {
    const [result , setResult]= useState();
    const [city , setCity] =useState('delhi');
    const [show , setShow] =useState(false);
    var date = new Date();
    var formattedDate = format( date, "MMMM dd , yyyy, H:mma");
    console.log("second console",formattedDate);
    useEffect(() => {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then(response => response.json())
      .then(data => (setResult(data)))
      .catch(error =>(setResult()))
         } , [])
    const togelHandler=()=>{
      setShow(!show);
    }
    const clickHandler = (e)=>{
      setCity(e.target.value);
    }
   const keyHandler=(e)=>{
        if(e.key ==="Enter"){
          fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
          .then(response => response.json())
          .then(data => (setResult(data)))
          .catch(error =>(setResult()))
  }
          
        }
    console.log("first console" ,new Date());
  return (
    <div className={result?.main?.temp <20?'App':'appSummer'}>
      <input onChange={(e) =>{clickHandler(e)}}
       onKeyPress={(e)=>{keyHandler(e)}}


        className="searchBox"
        type={Text}
        placeHolder="Type City Name"
      ></input>
   {result?.main  ? <div>
      
      <div>
        <div className="location">{result?.name},{result?.sys.country} </div>
        <div className="date">{formattedDate}</div>
      </div>
      <div className="temperature">{Math.round(result?.main.temp)}°C </div>
      <div className="temp">
        <div className="min temp_sibling">Min {Math.round(result?.main.temp_min)}°C </div>
        <div className="max temp_sibling">Max {Math.round(result?.main.temp_max)}°C </div>
      </div>
      <div className="weather">{result?.weather[0].main}</div>
      <div>
        <button className="button"onClick={togelHandler}> {show?'Show Less':'Show More'} </button>
        <div className="application">
         {show&&<><div>Wind Speed: {result?.wind.speed}km/miles</div>
          <div>Humidity: {result?.main.humidity}%</div>
          <div>Pressure: {result?.main.pressure}Pa</div>           
          <div>sunrise: {moment.utc(result?.sys.sunrise).format().split("T")[1]}</div>
          <div>Sunset: {moment.utc(result?.sys.sunset).format().split("T")[1]}</div></>}
        </div>
   </div>
     <div className="map-div">
       <Map/>
     </div>
      </div>:<div className ="Error" >
        <div> Entered city not found
         <br/>Enter a valid city</div>
        </div>}
    </div>
  );
};

export default App;
