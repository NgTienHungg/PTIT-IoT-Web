import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import './nhietdo.css';

function Nhietdo(props) {
  // Nhận nhiệt độ từ props
  const temperature = parseInt(props.temperature);

  // Xác định biểu tượng thời tiết và lớp CSS cho nhiệt độ
  let weatherIcon;
  let temperatureClass = 'normal';

  // Xác định biểu tượng thời tiết và lớp CSS dựa trên giá trị nhiệt độ
  if (temperature >= 35) {
    weatherIcon = <WiDaySunny />;
    temperatureClass = 'hot';
  } else if (temperature >= 20) {
    weatherIcon = <WiCloudy />;
    temperatureClass = 'normal';
  } else {
    weatherIcon = <WiSnow />;
    temperatureClass = 'cold';
  }

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