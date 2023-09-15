import React from 'react';
import './anhsang.css';
import { WiHorizonAlt } from 'react-icons/wi';

function Anhsang() {
  const lux = 50; // Giả định nhiệt độ
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
    // <div className={`anhsang1 weather-box ${luxClass}`}>
    //   <p className='weatherIcon' >{weatherIcon} </p>
    //   <div className='thongtinanhsang'> {lux}Lux</div>
    // </div>

    <div className={`weather-box ${luxClass}`}>
      <div className="weather-info" style={{ color: 'white' }} >
        <div className='weather-icon'>{weatherIcon}</div>
        <div className='thongtinnhietdo'>{lux} lux</div>
      </div>
    </div>
  );
}

export default Anhsang;
