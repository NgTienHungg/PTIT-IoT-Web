import { useState, useEffect } from 'react';
import Charts from '../Chart/Charts';
import Temperature from '../temperature/temperature';
import Anhsang from '../anhsang/Anhsang';
import Doam from '../doam/Doam';
import Menu from '../menu/Menu';
import mqtt from 'precompiled-mqtt';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './page.css'

// Khai báo các biến hằng
const urlLightOn = "https://i.imgur.com/imqSxdm.png";
const urlLightOff = "https://i.imgur.com/OXXnlPH.png";
const urlFanOn = "https://i.imgur.com/Wx2lXcJ.png";
const urlFanOff = "https://i.imgur.com/ynfVzo0.png";

const TEMPERATURE_TOPIC = 'dht11/temperature';
const HUMIDITY_TOPIC = 'dht11/humidity';
const LIGHT_TOPIC = 'dht11/light';

const Page = () => {
    // Khởi tạo các trạng thái cho đèn và quạt
    const [isLightOn, setIsLightOn] = useState(false);
    const [isFanOn, setIsFanOn] = useState(false);

    const [temperature, setTemperature] = useState(30); // Giả định nhiệt độ
    const [humidity, setHumidity] = useState(50); // Giả định độ ẩm
    const [light, setLight] = useState(100); // Giả định độ sáng

    // Tạo một MQTT client
    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

    useEffect(() => {
        // Khi kết nối thành công, subscribe các topic
        client.on('connect', () => {
            client.subscribe('dht11/temperature');
            client.subscribe('dht11/humidity');
            client.subscribe('dht11/light');
        });

        // Khi nhận được tin nhắn, cập nhật các trạng thái
        client.on('message', (topic, payload) => {
            if (topic === TEMPERATURE_TOPIC) {
                console.log("Topic: " + TEMPERATURE_TOPIC + " - Message: " + payload);
                setTemperature(payload);
            }
            else if (topic === HUMIDITY_TOPIC) {
                setHumidity(payload);
            }
            else if (topic === LIGHT_TOPIC) {
                setLight(payload);
            }
        });

        return () => {
            client.unsubscribe('dht11/temperature');
        };
    }, [client, temperature, humidity, light]);

    // Hàm bật/tắt đèn
    const toggleLight = () => {
        setIsLightOn(prevState => !prevState);

        // Gửi tin nhắn MQTT khi đèn được bật hoặc tắt
        const message = isLightOn ? 'off' : 'on';
        client.publish('esp32/led', message);
        console.log("Đã gửi tin nhắn MQTT: " + message + " đến topic esp32/led ");
    };

    // Hàm bật/tắt quạt
    const toggleFan = () => {
        setIsFanOn(prevState => !prevState);
    };

    // Render giao diện
    return (
        <>
            <div className="pagee">
                {/* <div className="menuu">
                    <Menu />
                </div> */}

                {/* Render các thông số hiển thị */}
                <div className="page-chucnang">
                    <Temperature temperature={temperature} />
                    <Doam humidity={humidity} />
                    <Anhsang light={light} />
                </div>

                <div className="page-btn">
                    <div className="page-bieudo">
                        <Charts temperature={temperature} humidity={humidity} light={light} />
                    </div>

                    <div className="page-btn-chucnang">
                        <div className="page-btn-den">
                            <div className="btn-icon">
                                <img className="btn-icon-den" src={isLightOn ? urlLightOn : urlLightOff} alt="Bulb" />
                                <br />
                                <button className={`light-btn ${isLightOn ? 'on' : 'off'}`} onClick={toggleLight}>
                                    <span className="light-icon"></span>
                                </button>
                            </div>
                        </div>

                        <div className="page-btn-quat">
                            <div className="btn-icon">
                                <img className="btn-icon-den" src={isFanOn ? urlFanOn : urlFanOff} alt="Bulb" />
                                <br />
                                <button className={`light-btn ${isFanOn ? 'on' : 'off'}`} onClick={toggleFan}>
                                    <span className="light-icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page

/*
- MQTT: push từ web, sub từ arduino
- Arduino: push nhiệt độ độ ẩm, 
*/