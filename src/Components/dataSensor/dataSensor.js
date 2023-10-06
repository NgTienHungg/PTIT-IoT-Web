import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const DataSensor = () => {
  // Dữ liệu mẫu
  const data = [
    { id: 1, temp: 25, humid: 50, light: 1000, time: '2023-09-13 10:00:00' },
    { id: 2, temp: 24, humid: 48, light: 200, time: '2023-09-13 10:15:00' },
    { id: 3, temp: 26, humid: 52, light: 800, time: '2023-09-13 10:30:00' },
    { id: 4, temp: 27, humid: 55, light: 1200, time: '2023-09-13 10:45:00' },
    { id: 5, temp: 23, humid: 49, light: 600, time: '2023-09-13 11:00:00' },
    { id: 6, temp: 28, humid: 58, light: 900, time: '2023-09-13 11:15:00' },
    { id: 7, temp: 22, humid: 47, light: 400, time: '2023-09-13 11:30:00' },
    { id: 8, temp: 24, humid: 53, light: 1500, time: '2023-09-13 11:45:00' },
    { id: 9, temp: 29, humid: 60, light: 700, time: '2023-09-13 12:00:00' },
    { id: 10, temp: 30, humid: 62, light: 1800, time: '2023-09-13 12:15:00' },
    // Thêm dữ liệu khác tại đây...
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center">Data Sensor</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Temp (°C)</th>
            <th className="text-center">Humid (%)</th>
            <th className="text-center">Light (lux)</th>
            <th className="text-center">Time</th> {/* Cột thời gian ở cuối cùng */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td className="text-center">{item.temp}</td>
              <td className="text-center">{item.humid}</td>
              <td className="text-center">{item.light}</td>
              <td className="text-center">{item.time}</td> {/* Hiển thị thời gian ở cuối cùng */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSensor;
