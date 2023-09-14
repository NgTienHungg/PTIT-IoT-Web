import React from 'react';
import './nhietdo.css';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThermometer } from 'react-icons/wi';

function Nhietdo() {
  const temperature = 30; // Giả định nhiệt độ
  let temperatureClass = 'normal';

  // Xác định biểu tượng thời tiết và mô tả thời tiết
  let weatherIcon;

  if (temperature < 12) {
    weatherIcon = <WiSnow />;
    temperatureClass = 'cold';
  } else if (temperature >= 12 && temperature < 22) {
    weatherIcon = <WiRain />;
    temperatureClass = 'rainy';
  } else if (temperature >= 22 && temperature < 32) {
    weatherIcon = <WiCloudy />;
    temperatureClass = 'normal';
  } else {
    weatherIcon = <WiDaySunny />;
    temperatureClass = 'hot';
  }

  // fixed
  temperatureClass = 'hot'
  weatherIcon = <WiThermometer />

  return (
    <div className={`weather-box ${temperatureClass}`}>
      <div className="weather-info">
        <div className='weather-icon'>{weatherIcon}</div>
        <div className='thongtinnhietdo'>{temperature}°C</div>
      </div>
    </div>
  );
}

export default Nhietdo;
