import React from 'react';
import "../css/ForecastDisplay.css";

export default function ForecastDisplay({forecastData}) {

  function getWeekDay(day){
    day = day.substring(0,10);

    let date = new Date(day);

    return `${date.toLocaleDateString('en-US', {weekday: 'long'})}, ${date.toLocaleDateString()}`;
  }

  const getUrl = (icon) => { return `https://openweathermap.org/img/wn/${icon}@2x.png`;}

  return (
    <div className='container'>
      <div className='forecastScroll'>
          {forecastData.map(obj => {
              return (
                <div className="forecastDay" key={obj.day}>
                    <div>{getWeekDay(obj.date)}</div>
                    <br></br>
                    <img alt="weather" src={getUrl(obj.icon)}></img>
                    <br></br>
                    <div className='forecast_temp'>{obj.temp} °C</div>
                </div>
              );
          })}
      </div>
    </div>
  )
}
