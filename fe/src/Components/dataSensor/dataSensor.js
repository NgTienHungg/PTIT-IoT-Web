import React, { useState, useEffect } from 'react';
import moment from 'moment';
import mqtt from 'precompiled-mqtt'
import axios from 'axios'
import Menu from '../menu/menu';
import './dataSensor.css'

function DataSensor() {

    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    const TOPIC_IOT_WEATHER = 'iot/weather';

    const [listDataSensor, setListDataSensor] = useState(null);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [inputPage, setInputPage] = useState(currentPage);
    const [tempInputPage, setTempInputPage] = useState(''); // page tạm thời

    const [temperatureInput, setTemperatureInput] = useState(''); // Thêm trường nhập nhiệt độ
    const [humidityInput, setHumidityInput] = useState(''); // Thêm trường nhập độ ẩm
    const [lightInput, setLightInput] = useState(''); // Thêm trường nhập ánh sáng

    const [temperature, setTemperature] = useState(''); // Thêm trường nhập nhiệt độ
    const [humidity, setHumidity] = useState(''); // Thêm trường nhập độ ẩm
    const [light, setLight] = useState(''); // Thêm trường nhập ánh sáng

    const [searchClicked, setSearchClicked] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [isClear, setIsClear] = useState(false);

    const rowsPerPage = 20;

    useEffect(() => {
        // Gửi yêu cầu API và lấy dữ liệu
        function callapi() {
            fetch(`http://localhost:8080/${searchClicked ? `search-sensor?temperature=${temperatureInput}&humidity=${humidityInput}&light=${lightInput}` : `sensors`}`)
                .then((response) => response.json())
                .then((data) => {
                    data.forEach((item) => {
                        item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
                    });

                    setTotalPages(Math.ceil(data.length / rowsPerPage)); // Tính tổng số trang
                    const startIndex = (currentPage - 1) * rowsPerPage;
                    const endIndex = startIndex + rowsPerPage;
                    const slicedData = data.slice(startIndex, endIndex);
                    setInputPage(currentPage.toString()); // Chuyển currentPage thành chuỗi
                    setListDataSensor(slicedData);
                })
                .catch((error) => {
                    console.error('Lỗi khi gửi yêu cầu API:', error);
                });
        }

        client.subscribe(TOPIC_IOT_WEATHER);
        client.on('message', (topic, message) => {
            const sensorData = JSON.parse(message.toString());

            // Kiểm tra nếu có các trường như 'temperature', 'humidity' và 'light' trong dữ liệu nhận được
            if (sensorData.temperature !== undefined && sensorData.humidity !== undefined && sensorData.light !== undefined && sensorData.dust !== undefined) {
                handleData(sensorData);
            }
        });

        const interval = setInterval(callapi, 2000);

        // Xóa interval khi component bị hủy
        return () => {
            clearInterval(interval);
            client.unsubscribe(TOPIC_IOT_WEATHER);
        };
    }, [currentPage, isClear, searchClicked, temperature, humidity, light]); // Rỗng để chỉ chạy một lần khi component được render

    const handlePageInputChange = (e) => {
        setTempInputPage(e.target.value); // Cập nhật giá trị tạm thời
    };

    const handlePageInputEnter = (e) => {
        if (e.key === 'Enter') {
            const newPage = parseInt(e.target.value, 10);
            if (newPage >= 1 && newPage <= totalPages) {
                setCurrentPage(newPage);
                setTempInputPage('');
            }
        }
    };

    function handleData(data) {
        if (!isUpload) {
            setIsUpload(true);
            axios.post('http://localhost:8080/add-sensor', data)
                .then((response) => {
                    console.log('Dữ liệu đã được gửi thành công tu sensor data:', response.data);
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
    const handleSearch = () => {
        if (temperatureInput !== '' || humidityInput !== '' || lightInput !== '') {
            setTemperature(temperatureInput.trim());
            setHumidity(humidityInput.trim());
            setLight(lightInput.trim());
            setSearchClicked(true);
        }
        else
            setSearchClicked(false);
        setCurrentPage(1);
    };
    const handlePageSearchEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    const handleExit = () => {
        setCurrentPage(1);
        setSearchClicked(false);
        setTemperatureInput('');
        setHumidityInput('');
        setLightInput('');
    };

    const handleClear = () => {
        if (!isClear) {
            setIsClear(true);

            fetch(`http://localhost:8080/clear-sensor`)
                .then((response) => {
                    console.log('Dữ liệu đã được xóa thành công:');
                    // Thực hiện các hành động khác sau khi xóa dữ liệu thành công (nếu cần)
                })
                .catch((error) => {
                    console.error('Đã xảy ra lỗi khi xóa dữ liệu:', error);
                    // Xử lý lỗi (nếu cần)
                })
                .finally(() => {
                    // de refesh lai trang
                    setIsClear(false);
                });
        }
    };


    let rowCount = 0; // check hàng chẵn - lẻ

    return (
        <div className='menu-data'>
            <div className="menuu">
                <Menu />
            </div>
            <div className='container-data'>
                <h1>Dữ liệu cảm biến</h1>
                <div className='search-khung'>
                    <input
                        className='search-ip'
                        type="text"
                        placeholder="Nhiệt độ (°C)"
                        value={temperatureInput}
                        onChange={(e) => setTemperatureInput(e.target.value)}
                        onKeyPress={handlePageSearchEnter}
                    />
                    <input
                        className='search-ip'
                        type="text"
                        placeholder="Độ ẩm (%)"
                        value={humidityInput}
                        onChange={(e) => setHumidityInput(e.target.value)}
                        onKeyPress={handlePageSearchEnter}

                    />
                    <input
                        className='search-ip'
                        type="text"
                        placeholder="Ánh sáng (lux)"
                        value={lightInput}
                        onChange={(e) => setLightInput(e.target.value)}
                        onKeyPress={handlePageSearchEnter}

                    />
                    <button className='btn-exit btn-exit-search bi bi-search' onClick={() => handleSearch()}> Search</button>
                    <button className='btn-exit btn-exit-exit bi bi-card-list' onClick={() => handleExit()}> All</button>
                    <button className='btn-exit btn-exit-clear bi bi-trash' onClick={() => handleClear()}> Clear</button>
                </div>

                {listDataSensor && (
                    <table>
                        <thead>
                            <tr className='tr_thoitiet'>
                                <th>ID</th>
                                <th>Nhiêt độ (C)</th>
                                <th>Độ ẩm (%)</th>
                                <th>Ánh sáng (lux) </th>
                                {/* <th>Độ bụi (%) </th> */}
                                <th>Thời gian </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listDataSensor.map((data) => {
                                    rowCount++; // Tăng biến đếm hàng
                                    const isEvenRow = rowCount % 2 === 0;
                                    const rowClass = isEvenRow ? "id_chan" : "id_le";
                                    return (

                                        <tr className={rowClass}>
                                            <td>{data.id}</td>
                                            <td>{data.temperature}</td>
                                            <td>{data.humidity}</td>
                                            <td>{data.light}</td>
                                            {/* <td>{data.dust}</td> */}
                                            <td>{data.date}</td>
                                        </tr>

                                    )
                                })
                            }</tbody>
                    </table>
                )}
                <div className="pagination">
                    <button className='btn-truoc' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Trước
                    </button>
                    <input
                        className='ip-trang'
                        // type="number"
                        value={tempInputPage}
                        onChange={handlePageInputChange}
                        onKeyPress={handlePageInputEnter}
                        min={1}
                        max={totalPages}
                        placeholder={inputPage + "/" + totalPages}
                    />
                    {/* </span> */}
                    <button className='btn-tiep' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Tiếp
                    </button>
                </div>
            </div>
        </div>
    );
}
export default DataSensor;