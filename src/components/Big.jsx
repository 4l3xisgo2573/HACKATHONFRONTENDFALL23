import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import axios from 'axios';

const LineGraph = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Big Container',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgb(180, 0, 180)',
        borderColor: 'rgb(180, 0, 180)',
        data: data.values,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

const Big = () => {
  const [apiData, setApiData] = useState([]);
  const [apiData2, setApiData2] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [apiLabels, setApiLabels] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://containers_api-1-x8955756.deta.app/logs/1')
      .then(res => {
        const sortedData = res.data
          .map(item => ({
            reading1: item.reading_1,
            reading2: item.reading_2,
            timestamp: new Date(item.timestamp),
          }))
          .sort((a, b) => b.timestamp - a.timestamp);

        const lastEightValues = sortedData.map(item => item.reading1).slice(-8);
        const lastEightValues2 = sortedData.map(item => item.reading2).slice(-8);
        const lastEightLabels = sortedData.map(item => item.timestamp.toLocaleString()).slice(-8);

        setApiData(lastEightValues);
        setApiData2(lastEightValues2);
        setApiLabels(lastEightLabels);

        setIsEmpty(lastEightValues && lastEightValues[0] > 6 || lastEightValues[0] < 2);
      })
      .catch(err => {
        console.log(err);
        // Handle the error gracefully, e.g., set an error state or display an error message.
      });
  };

  return (
    <div className="content">
      <h2 className="type-title">Big Container</h2>
      <div className="status">
        <div className="type-title">
          <h3 className="status-title">Status</h3>
          <p className="status-value">{isEmpty ? 'Empty' : 'Full'}</p>
        </div>
        <div className="status-icon">
          <i className={`fas fa-${isEmpty ? 'check-circle' : 'exclamation-circle'}`}></i>
        </div>
      </div>
      <LineGraph data={{ labels: apiLabels, values: apiData }} />
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Bottom Sensor</th>
            <th>Top Sensor</th>
          </tr>
        </thead>
        <tbody>
          {apiLabels && apiData && apiData2 && apiLabels.map((label, index) => (
            <tr key={index}>
              <td>{label}</td>
              <td>{apiData[index]}</td>
              <td>{apiData2[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Big;
