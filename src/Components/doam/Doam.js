import { React, useState, useEffect } from 'react';
// import './doam.css';
import { WiHumidity } from 'react-icons/wi';

function Doam(props) {
  const [humidity, setHumidity] = useState();

  // set humidity khi co su thay doi
  useEffect(() => {
    setHumidity(props.humidity);
  }, [humidity]);

  let humidityClass;
  // Xác định biểu tượng thời tiết dựa trên nhiệt độ

  let weatherIcon;
  if (humidity < 50) {
    weatherIcon = <WiHumidity />;
    humidityClass = 'thap';
  } else if (humidity < 80) {
    weatherIcon = <WiHumidity />;
    humidityClass = 'trungbinh';
  } else {
    weatherIcon = <WiHumidity />;
    humidityClass = 'cao';
  }

  return (
    <div className={`weather-box ${humidityClass}`}>
      <div className="weather-info" style={{ color: 'white' }} >
        <div className='weather-icon'>{weatherIcon}</div>
        <div className='thongtinnhietdo'>{humidity}%</div>
      </div>
    </div>
  );
}

export default Doam;