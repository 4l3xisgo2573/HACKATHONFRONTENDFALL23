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

function Big() {
  const [apiData, setApiData] = useState(null);
  const [apiLabels, setApiLabels] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://containers_api-1-x8955756.deta.app/logs/1')
    .then(res => {
      // Assuming res.data is an array of objects similar to your provided example
      const arrayOfValues = res.data.map(item => item.reading_1);
      const arrayOftags = res.data.map(item => item.timestamp);
      
      // Set the arrayOfValues to setApiData
      setApiData(arrayOfValues);
      setApiLabels(arrayOftags);
      
      //console.log(arrayOfValues); // Optionally log the array of values
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
      <h2 className="type-title">Big Container</h2>
      <LineGraph data={graphData} />
      <p>Data from API: {apiData ? 'Loaded' : 'Loading...'}</p>
      <h2>You are currently low </h2>
    </div>
  );
}

export default Big;
