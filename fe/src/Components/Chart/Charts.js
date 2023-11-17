import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
);

function Chart(props) {
    // Khởi tạo state cho nhiệt độ, độ ẩm, ánh sáng và ngày
    const [data, setData] = useState({
        temperature: [],
        humidity: [],
        light: [],
        date: [],
    });

    // Sử dụng một cờ để kiểm tra xem có đang trong quá trình cập nhật dữ liệu hay không
    const [isUpdatingData, setIsUpdatingData] = useState(false);

    // Hàm để cập nhật dữ liệu từ props
    // Thay thế phần tương ứng trong hàm updateData
    const updateData = () => {
        // Kiểm tra xem có đang trong quá trình cập nhật dữ liệu không
        if (!isUpdatingData) {
            setIsUpdatingData(true);

            // Lấy dữ liệu từ props và cập nhật state
            const newTemperature = props.thoitiet[0];
            const newHumidity = props.thoitiet[1];
            const newLight = props.thoitiet[2] / 10;
            const newDate = new Date().toLocaleTimeString();

            // Cập nhật state bằng cách tạo một bản sao của state hiện tại
            const updatedData = { ...data };

            // Giới hạn số lượng dữ liệu hiển thị trên biểu đồ
            if (updatedData.temperature.length > 10) {
                updatedData.temperature.shift();
                updatedData.humidity.shift();
                updatedData.light.shift();
                updatedData.date.shift();
            }

            // Thêm dữ liệu mới vào cuối mảng
            updatedData.temperature.push(newTemperature);
            updatedData.humidity.push(newHumidity);
            updatedData.light.push(newLight);
            updatedData.date.push(newDate);

            // Cập nhật state
            setData(updatedData);

            setIsUpdatingData(false); // Đánh dấu việc cập nhật dữ liệu đã hoàn thành
        }
    };

    // Tạo một hàm riêng để gọi updateData
    const fetchDataAndUpdate = () => {
        updateData();
    };

    // Tự động cập nhật dữ liệu mỗi 2 giây
    useEffect(() => {
        console.log('Chart: useEffect');
        fetchDataAndUpdate();
        // const intervalId = setInterval(fetchDataAndUpdate, 2000);

        // // Xóa interval khi component bị hủy
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, [props]);

    // Dữ liệu cho biểu đồ
    const chartData = {
        labels: data.date,
        datasets: [
            {
                label: 'Nhiệt độ (°C)',
                data: data.temperature,
                borderColor: 'red',
                fill: false,
            },
            {
                label: 'Độ ẩm (%)',
                data: data.humidity,
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Ánh sáng (lux)',
                data: data.light,
                borderColor: 'green',
                fill: false,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 2,
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} height={300} width={600} />
        </div>
    );
}

export default Chart;
