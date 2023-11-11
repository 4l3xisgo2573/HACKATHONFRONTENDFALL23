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
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
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

function DeviceScreen() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://containers_api-1-x8955756.deta.app/logs/1 ')
      .then(res => {
        setApiData(res);
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    values: apiData || [65, 59, 80, 81, 56], 
  };

  return (
    <div className="content">
      <h2 className="type-title">Big Container</h2>
      <LineGraph data={graphData} />
      <p>Data from API: {apiData ? 'Loaded' : 'Loading...'}</p>
      <h2>You are currently low </h2>
    </div>
  );
}

export default DeviceScreen;
