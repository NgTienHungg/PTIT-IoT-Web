import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const LightEvent = () => {
  // Dữ liệu mẫu
  const data = [
    { id: 1, mode: 'Auto', time: '23:07:00 14-09-2023' },
    { id: 2, mode: 'Manual', time: '10:15:00 15-09-2023' },
    { id: 3, mode: 'Auto', time: '14:30:00 16-09-2023' },
    // Thêm dữ liệu khác tại đây...
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center">Data Table</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Mode</th>
            <th className="text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td className="text-center">{item.mode}</td>
              <td className="text-center">
                {moment(item.time, 'HH:mm:ss DD-MM-YYYY').format('HH:mm:ss DD-MM-YYYY')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LightEvent;
