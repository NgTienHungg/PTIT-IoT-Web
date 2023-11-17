import { useState, useEffect } from 'react';
import axios from 'axios';
import Charts from '../Chart/Charts';
import Temperature from '../dht11/temperature';
import Humidity from '../dht11/humidity';
import Light from '../dht11/light';
import Menu from '../menu/menu';
import mqtt from 'precompiled-mqtt';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './page.css'
import Dust from '../dht11/dust';
import Chartdobui from '../chartDobui/chartDobui';

// Khai báo các biến hằng
const urlLedOn = "https://i.imgur.com/imqSxdm.png";
const urlLedOff = "https://i.imgur.com/OXXnlPH.png";
const urlFanOn = "https://i.imgur.com/Wx2lXcJ.png";
const urlFanOff = "https://i.imgur.com/ynfVzo0.png";

const TOPIC_IOT_WEATHER = 'iot/weather';
const TOPIC_IOT_LED_FAN = 'iot/ledFan';
const TOPIC_CONTROL_LED = 'control/led';
const TOPIC_CONTROL_FAN = 'control/fan';

const Page = () => {
    // Khởi tạo các trạng thái cho đèn và quạt
    const [isLedOn, setIsLedOn] = useState(false);
    const [isFanOn, setIsFanOn] = useState(false);

    const [temperature, setTemperature] = useState(30); // Giả định nhiệt độ
    const [humidity, setHumidity] = useState(50); // Giả định độ ẩm
    const [light, setLight] = useState(100); // Giả định độ sáng
    const [dust, setDust] = useState(60);

    const [isUpload, setIsUpload] = useState(false);

    const [turnOnCount, setTurnOnCount] = useState(0);


    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt'); // Tạo một MQTT client

    useEffect(() => {
        // Khi kết nối thành công, subscribe các topic
        client.subscribe(TOPIC_IOT_WEATHER);
        client.subscribe(TOPIC_IOT_LED_FAN);

        // Khi nhận được tin nhắn, cập nhật các trạng thái
        client.on('message', (topic, message) => {

            console.log("Topic: " + topic + " - Message: " + message);
            const datasub = JSON.parse(message.toString());

            if (topic === TOPIC_IOT_WEATHER) {

                // Kiểm tra nếu có các trường như 'temperature', 'humidity' và 'light' trong dữ liệu nhận được
                if (datasub.temperature !== undefined && datasub.humidity !== undefined && datasub.light !== undefined && datasub.dust !== undefined) {
                    setTemperature(datasub.temperature);
                    setHumidity(datasub.humidity);
                    setLight(datasub.light);
                    setDust(datasub.dust);

                    // gui du lieu len database
                    postDataSensorToDatabase(datasub.temperature, datasub.humidity, datasub.light, datasub.dust);
                }
            }
            else if (topic === TOPIC_IOT_LED_FAN) {
                if (datasub.led !== undefined && datasub.fan !== undefined) {
                    if (datasub.led === 'on') {
                        setIsLedOn(true);
                    } else {
                        setIsLedOn(false);
                    }
                    if (datasub.fan === 'on') {
                        setIsFanOn(true);
                    } else {
                        setIsFanOn(false);
                    }
                }
            }
        });

        // Khi destroy
        return () => {
            client.unsubscribe(TOPIC_IOT_WEATHER);
            client.unsubscribe(TOPIC_IOT_LED_FAN);
        };
    }, [client, temperature, humidity, light]);


    // gửi dữ liệu sensor lên db
    function postDataSensorToDatabase(nhietdo, doam, anhsang, dobui) {
        if (!isUpload) {
            setIsUpload(true);
            axios.post('http://localhost:8080/add-sensor', {
                temperature: nhietdo,
                humidity: doam,
                light: anhsang,
                dust: dobui
            })
                .then((response) => {
                    console.log('Dữ liệu đã được gửi thành công tu page:', response.data);
                    // Thực hiện các hành động khác sau khi gửi dữ liệu thành công (nếu cần)
                })
                .catch((error) => {
                    console.error('Đã xảy ra lỗi khi gửi dữ liệu:', error);
                    // Xử lý lỗi (nếu cần)
                })
                .finally(() => {
                    setIsUpload(false);
                });
        }
    }

    // gửi lịch sử bật tắt lên database
    function postLedFanToDatabase(ten, trangthai) {
        axios.post('http://localhost:8080/add-ledfan', {
            name: ten,
            status: trangthai
        })
            .then((response) => {
                console.log('Dữ liệu đã được gửi thành công tu page:', response.data);
                // Thực hiện các hành động khác sau khi gửi dữ liệu thành công (nếu cần)
            })
            .catch((error) => {
                console.error('Đã xảy ra lỗi khi gửi dữ liệu:', error);
                // Xử lý lỗi (nếu cần)
            });
    }


    // Hàm bật/tắt đèn
    const toggleLed = () => {
        setIsLedOn(prevState => !prevState);
    };
    useEffect(() => {
        // Gửi tin nhắn MQTT khi đèn được bật hoặc tắt
        const message = isLedOn ? 'on' : 'off';
        client.publish(TOPIC_CONTROL_LED, message);
        postLedFanToDatabase('Led', message);
        console.log("Đã gửi tin nhắn " + message + " đến topic " + TOPIC_CONTROL_LED);

        // Nếu đèn được bật, tăng số lần bật đèn
        if (isLedOn) {
            setTurnOnCount((prevCount) => prevCount + 1);
        }
    }, [isLedOn]);

    // Hàm bật/tắt quạt
    const toggleFan = () => {
        setIsFanOn(prevState => !prevState);
    };
    useEffect(() => {
        // Gửi tin nhắn MQTT khi đèn được bật hoặc tắt
        const message = isFanOn ? 'on' : 'off';
        client.publish(TOPIC_CONTROL_FAN, message);
        postLedFanToDatabase('Fan', message);
        console.log("Đã gửi tin nhắn " + message + " đến topic " + TOPIC_CONTROL_FAN);
    }, [isFanOn]);




    useEffect(() => {
        // Gửi yêu cầu API để lấy số lần bật đèn từ controller
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/count-led');
                const data = await response.json();

                // Cập nhật giá trị số lần bật đèn từ dữ liệu nhận được
                setTurnOnCount(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API:', error);
            }
        };

        fetchData();
    }, [turnOnCount]); // useEffect sẽ chạy một lần sau khi component được render


    // Render giao diện
    return (
        <>
            <div className="pagee">
                <div className="menuu">
                    <Menu />
                </div>

                {/* Render các thông số hiển thị */}
                <div className="page-chucnang">
                    <Temperature temperature={temperature} />
                    <Humidity humidity={humidity} />
                    <Light light={light} />
                    {/* <Dust dust={dust} /> */}
                </div>

                <div className="page-btn">
                    <div className="page-bieudo">
                        <Charts thoitiet={[temperature, humidity, light]} />
                        {/* <Chartdobui dobui={dust} ></Chartdobui> */}
                    </div>

                    <div className="page-btn-chucnang">
                        <div className="page-btn-den">
                            <div className="turn-counts">
                                <p>Số lần bật đèn: {turnOnCount}</p>
                            </div>

                            <div className="btn-icon">
                                <img className="btn-icon-den" src={isLedOn ? urlLedOn : urlLedOff} alt="Bulb" />
                                <br />
                                <button className={`light-btn ${isLedOn ? 'on' : 'off'}`} onClick={toggleLed}>
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