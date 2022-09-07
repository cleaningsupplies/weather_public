import React from 'react';
import "../css/WeatherDisplay.css"

export default function WeatherDisplay({weatherData}) {

    const getUrl = (icon) => { return `https://openweathermap.org/img/wn/${icon}@2x.png`};

    return (
        <div className='weatherDisplay'>
            <div className='city'>
                {weatherData.city}
            </div>
            <img alt={weatherData.description} src={getUrl(weatherData.icon)}></img>
            <div className="temp">
                {weatherData.temp} °C 
            </div>
            <div className="description">
                {weatherData.description}
            </div>
        </div>
    )
}
