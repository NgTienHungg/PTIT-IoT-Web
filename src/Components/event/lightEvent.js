import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const LightEvent = () => {
  // Dữ liệu mẫu
  const data = [
    { id: 1, light: 'On', time: '2023-09-13 10:00:00' },
    { id: 2, light: 'Off', time: '2023-09-13 10:15:00' },
    { id: 3, light: 'On', time: '2023-09-13 10:30:00' },
    { id: 4, light: 'Off', time: '2023-09-13 10:45:00' },
    { id: 5, light: 'On', time: '2023-09-13 11:00:00' },
    { id: 6, light: 'On', time: '2023-09-13 11:15:00' },
    { id: 7, light: 'Off', time: '2023-09-13 11:30:00' },
    { id: 8, light: 'On', time: '2023-09-13 11:45:00' },
    { id: 9, light: 'Off', time: '2023-09-13 12:00:00' },
    { id: 10, light: 'On', time: '2023-09-13 12:15:00' },
    // Thêm dữ liệu khác tại đây...
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center">Light Events</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Light</th>
            <th className="text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td className="text-center">{item.light}</td>
              <td className="text-center">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LightEvent;
