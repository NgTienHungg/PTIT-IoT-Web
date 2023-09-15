import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const LightEvent = () => {
  // Dữ liệu mẫu
  const data = [
    { id: 1, temp: 25, humid: 50, light: 'On' },
    { id: 2, temp: 24, humid: 48, light: 'Off' },
    { id: 3, temp: 26, humid: 52, light: 'On' },
    // Thêm dữ liệu khác tại đây...
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center">Light Events</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Temp (°C)</th>
            <th className="text-center">Humid (%)</th>
            <th className="text-center">Light</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td className="text-center">{item.temp}</td>
              <td className="text-center">{item.humid}</td>
              <td className="text-center">{item.light}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LightEvent;