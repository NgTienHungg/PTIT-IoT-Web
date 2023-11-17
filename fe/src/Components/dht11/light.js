import React, { useState, useEffect } from 'react';
import { WiHorizonAlt } from 'react-icons/wi';
import './weather.css';

function getLightClass(light) {
  if (light <= 200) {
    return 'toi';
  } else if (light <= 500) {
    return 'hoitoi';
  } else if (light <= 800) {
    return 'sang';
  } else {
    return 'ratsang';
  }
}

const Light = (props) => {
  const light = parseInt(props.light);
  let lightClass = getLightClass(light);

  return (
    <div className={`weather-box ${lightClass}`}>
      <div className="weather-info" style={{ color: 'white' }} >
        <div className='weather-icon'><WiHorizonAlt /></div>
        <div className='thongtinnhietdo'>{light} lux</div>
      </div>
    </div>
  );
}

export default Light;