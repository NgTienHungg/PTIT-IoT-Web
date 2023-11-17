import React, { useState, useEffect } from 'react';
import { WiDust } from "react-icons/wi";
import mqtt from 'precompiled-mqtt'
import './weather.css';

function Dust(props) {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt")
    const TOPIC_DO_BUI = "isDobui";

    const [dobui, setDobui] = useState(0);
    const [check, setCheck] = useState(true);

    useEffect(() => {
        setDobui(props.dust);
        if (props.dust > 60 && !check) {
            setCheck(true);
            client.publish(TOPIC_DO_BUI, "on");
        }
        if (props.dust <= 60 && check) {
            setCheck(false);
            client.publish(TOPIC_DO_BUI, "off");

        }
    }, [props]);

    const dobuiClass = dobui > 60 ? "red-background" : "";

    return (
        <div className={`weather-box ${dobuiClass}`}>
          <div className="weather-group" style={{ color: 'white' }}>
            <div className='weather-icon'><WiDust /></div>
            <div className='weather-info'>{dobui}%</div>
          </div>
        </div>
      );
}

export default Dust;
