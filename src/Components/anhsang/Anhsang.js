import React from 'react';
import './anhsang.css';
import { WiLunarEclipse } from 'react-icons/wi';

function Anhsang() {
  const lux = 90; // Giả định nhiệt độ
  let luxClass = 'normal';

  // Xác định biểu tượng thời tiết dựa trên nhiệt độ
  let weatherIcon;
  if (lux < 20) {
    weatherIcon = <WiLunarEclipse />;
    luxClass = 'toi';
  } else if (lux < 50) {
    weatherIcon = <WiLunarEclipse />;
    luxClass = 'hoitoi';
  } else if (lux < 80) {
    weatherIcon = <WiLunarEclipse />;
    luxClass = 'sang';
  } else {
    weatherIcon = <WiLunarEclipse />;
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
        <div className='thongtinnhietdo'>{lux}lux</div>
      </div>
    </div>
  );
}

export default Anhsang;
