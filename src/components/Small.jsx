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

const Small = () => {
  const [apiData, setApiData] = useState([]);
  const [apiLabels, setApiLabels] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://containers_api-1-x8955756.deta.app/logs/0')
      .then(res => {
        const sortedData = res.data
          .map(item => ({
            reading: ((item.readings || item.reading_1)/100).toFixed(2),
            timestamp: new Date(item.timestamp),
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        
        for (let i = 0; i < sortedData.length; i++) {
          console.log(sortedData[i].reading);
        }
        const lastEightValues = sortedData.map(item => item.reading).slice(-8);
        const lastEightLabels = sortedData.map(item => item.timestamp.toLocaleString()).slice(-8);

        setApiData(lastEightValues);
        setApiLabels(lastEightLabels);

        const isEmptyValue = lastEightValues && lastEightValues[0] > 6 || lastEightValues[0] < 2;
        setIsEmpty(isEmptyValue);
      })
      .catch(err => {
        console.log(err);
        // Handle the error gracefully, e.g., set an error state or display an error message.
      });
  };

  const graphData = {
    labels: apiLabels || [],
    values: apiData || [], 
  };

  return (
    <div className="content">
      <h2 className="type-title">Small Container</h2>
      <div className="status">
        <div className="type-title">
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
