import { React, useState, useEffect } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import './nhietdo.css';
import mqtt from 'precompiled-mqtt';

function Nhietdo() {
  const [temperature, setTemperature] = useState(30); // Giả định nhiệt độ

  // Khai báo client MQTT
  // const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

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
  // temperatureClass = 'hot'
  // weatherIcon = <WiThermometer />

  // Subscribe topic `dht11/temperature`
  // useEffect(() => {
  //   client.on('connect', () => {
  //     client.subscribe('dht11/temperature');
  //   });

  //   client.on('message', (topic, payload) => {
  //     if (topic === 'dht11/temperature') {
  //       setTemperature(parseInt(payload));
  //     }
  //   });

  //   return () => {
  //     client.disconnect();
  //   };
  // }, [client]);

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
