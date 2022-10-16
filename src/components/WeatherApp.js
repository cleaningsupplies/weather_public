import React from 'react';
import { useEffect, useState } from 'react';
import ForecastDisplay from './ForecastDisplay';
import UserInput from './UserInput';
import WeatherDisplay from './WeatherDisplay';
import "../css/WeatherApp.css";
import {api_key} from "../config.js";

export default function WeatherApp() {

    const WEATHER_API_KEY = api_key;

    const weather = {
        city: "",
        temp: "",
        min: "",
        max: "",
        description: "",
        icon: "",
    };

    const forecast = [
        {day: 1, date: "", temp: "", icon: ""},
        {day: 2, date: "", temp: "", icon: ""},
        {day: 3, date: "", temp: "", icon: ""},
        {day: 4, date: "", temp: "", icon: ""},
    ];

    const [weatherData, setWeatherData] = useState({});  
    const [forecastData, setForecastData] = useState(forecast);
      
    //getting current location data on page load 
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, function(error) {
                if (error.code === error.PERMISSION_DENIED){
                  alert("Please allow your browser to access your location first. You can do that in your settings. Thank you! 🌎");
                }
              });
        } else {
            alert("Geolocation is not supported by your browser. Try it on another browser. 🌎");
        }

        function showPosition(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude; 

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
        
            getWeather(weatherUrl);
            getForecast(forecastUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function showWeather(city){
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${WEATHER_API_KEY}&units=metric`
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${WEATHER_API_KEY}&units=metric`

        getWeather(weatherUrl, city);
        getForecast(forecastUrl);
    }

    function getWeather(url, city){
        const getJSON = async url => {
            const response = await fetch(url);
            return response.json(); 
        }
    
        getJSON(url)
        .then(data => {
            weather.city = data.name;
            weather.temp = Math.round(data.main.temp);
            weather.min = Math.round(data.main.temp_min);
            weather.max = Math.round(data.main.temp_max);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;
            setWeatherData(weather);
        }).catch(() => {
            alert(`${city} is not a valid input. Please enter city or town.`);
        });
    }

    function getForecast(url){
        const getJSON = async url => {
            const response = await fetch(url);
            return response.json(); 
        }
            
        getJSON(url)
        .then(data => {
            let index = 1;
            let j = 0;

            //getting midday data for each forecast day 
            const newDate = forecastData.map(obj => {
                
                if(obj.day === index){
                    index++;
                    for(let i = j; i < data.list.length; i++){
                        //check if midday, check if !today and check if !same data
                        if((data.list[i].dt_txt.includes("12:00") && !checkToday(data.list[i].dt_txt)) && i !== j){
                            j=i;
                            return {
                                ...obj, 
                                date: data.list[i].dt_txt,
                                temp: Math.round(data.list[i].main.temp),
                                icon: data.list[i].weather[0].icon
                            };
                        }
                    } 
                }
                return obj;
            })
            setForecastData(newDate);     
        }).catch(() => {
            console.log("Not a valid place");
        });
    }

    function checkToday(date){
        const day = date.substring(0,10);
        const today = new Date();
        const dd = String(today.getDate()).padStart(2,"0");
        const mm = String(today.getMonth()+1).padStart(2,"0");
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}` === day;
    }



    return (
        <div className='weatherApp'>
            <UserInput showWeather={showWeather} /> 
            <WeatherDisplay weatherData={weatherData} /> 
            <ForecastDisplay forecastData={forecastData} />
        </div>
    )
}
