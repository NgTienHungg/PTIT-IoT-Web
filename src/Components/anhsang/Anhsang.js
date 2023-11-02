import React, { useState, useEffect } from 'react';
import './anhsang.css';
import { WiHorizonAlt } from 'react-icons/wi';

function Anhsang(props) {
  const [lux, setLux] = useState();

  // set lux khi co su thay doi
  useEffect(() => {
    setLux(props.light);
  }, [lux]);

  let luxClass = 'normal';

  // Xác định biểu tượng thời tiết dựa trên nhiệt độ
  let weatherIcon;
  if (lux < 20) {
    weatherIcon = <WiHorizonAlt />;
    luxClass = 'toi';
  } else if (lux < 50) {
    weatherIcon = <WiHorizonAlt />;
    luxClass = 'hoitoi';
  } else if (lux < 80) {
    weatherIcon = <WiHorizonAlt />;
    luxClass = 'sang';
  } else {
    weatherIcon = <WiHorizonAlt />;
    luxClass = 'ratsang';
  }

  return (
    <div className={`weather-box ${luxClass}`}>
      <div className="weather-info" style={{ color: 'white' }} >
        <div className='weather-icon'>{weatherIcon}</div>
        <div className='thongtinnhietdo'>{lux} lux</div>
      </div>
    </div>
  );
}

export default Anhsang;
