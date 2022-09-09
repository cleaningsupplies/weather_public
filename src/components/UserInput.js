import React from 'react';
import "../css/UserInput.css";

export default function UserInput({showWeather}) {

    function handleSubmit(event){
        const city = document.querySelector(".inputText").value;
        showWeather(city);
        document.querySelector(".form").reset();
        event.preventDefault();
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <input className="inputText" type="text" placeholder="Enter city or town"></input>
                <input className="submit" type="submit" value=" "></input>
            </form>
        </div>
    )
}
