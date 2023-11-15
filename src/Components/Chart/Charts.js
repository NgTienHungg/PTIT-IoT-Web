import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import "./chart.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const initialData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6'],
    datasets: [{
        label: 'Nhiệt độ (°C)',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        Filler: true,
        // tension:0.7,
    }, {
        label: 'Độ ẩm (%)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        Filler: true,
        // tension:0.8,
    },],
};

const Charts = (props) => {
    const nhietdo = [25, 26, 24, 28, 29, 27, 26, 25, 26, 24, 28, 29, 27, 26, 26, 24, 28, 29, 27, 26]
    const doam = [60, 55, 50, 52, 58, 53, 54, 60, 55, 50, 52, 58, 53, 54, 55, 50, 52, 58, 53, 54]
    const [data, setData] = useState(initialData);

    useEffect((props) => {
        const interval = setInterval(() => {
            nhietdo.push(0);
            nhietdo.shift();
            doam.push(0);
            doam.shift();

            setData(prevData => ({
                ...prevData,
                datasets: [{ ...prevData.datasets[0], data: nhietdo }, { ...prevData.datasets[1], data: doam },]
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, [props]);

    // const generateRandomValues = () => {
    //     return Math.floor(Math.random() * 10 + 20);
    // }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
        },

        elements: {
            point: {
                radius: 0,
            },
        },
    };
    return (
        <div chart>
            <Line data={data} options={options} height={300} width={600} />
        </div>);
}

export default Charts;