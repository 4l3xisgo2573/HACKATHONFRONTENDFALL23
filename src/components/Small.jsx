import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import axios from 'axios';

const LineGraph = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Small Container',
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

function Small() {
  const [apiData, setApiData] = useState(null);
  const [apiLabels, setApiLabels] = useState(null);
  const [isEmpty, setIsEmpty] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://containers_api-1-x8955756.deta.app/logs/1')
      .then(res => {
        const sortedData = res.data
          .map(item => ({
            reading: item.reading_1,
            timestamp: new Date(item.timestamp),
          }))
          .sort((a, b) => b.timestamp-a.timestamp);

        const lastEightValues = sortedData.map(item => item.reading).slice(-8);
        const lastEightLabels = sortedData.map(item => item.timestamp.toISOString()).slice(-8);

        setApiData(lastEightValues);
        setApiLabels(lastEightLabels);
        setIsEmpty(apiData && apiData[0].reading_1 > 6 || apiData[0].reading_1 < 2);
        // const isEmpty = apiData && apiData[0].reading_1 > 6 || apiData[0].reading_1 < 2;
        console.log(isEmpty);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const graphData = {
    labels: apiLabels || ['January', 'February', 'March', 'April', 'May'],
    values: apiData || [65, 59, 80, 81, 56], 
  };

  




  return (
    <div className="content">
      <h2 className="type-title">Small Container</h2>
      <div className="status">
        <div className="status-text">
          <h3 className="status-title">Status</h3>
          <p className="status-value">{isEmpty ? 'Empty' : 'Full'}</p>
        </div>
        <div className="status-icon">
          <i className={`fas fa-${isEmpty ? 'check-circle' : 'exclamation-circle'}`}></i>
        </div>
      </div>
      <LineGraph data={graphData} />
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Reading Value</th>
          </tr>
        </thead>
        <tbody>
          {apiLabels && apiData && apiLabels.map((label, index) => (
            <tr key={index}>
              <td>{label}</td>
              <td>{apiData[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Small;
