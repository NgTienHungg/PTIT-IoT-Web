import { React, useState } from 'react';
import { WiHumidity } from 'react-icons/wi';
import './weather.css';

function getHumidityClass(humidity) {
  if (humidity <= 30) {
    return 'hum-low';
  } else if (humidity <= 60) {
    return 'hum-average';
  } else {
    return 'hum-high';
  }
}

const Humidity = (props) => {
  const humidity = parseInt(props.humidity);
  const humidityClass = getHumidityClass(humidity);

  return (
    <div className={`weather-box ${humidityClass}`}>
      <div className="weather-group" style={{ color: 'white' }}>
        <div className='weather-icon'><WiHumidity /></div>
        <div className='weather-info'>{humidity}%</div>
      </div>
    </div>
  );
}

export default Humidity;
