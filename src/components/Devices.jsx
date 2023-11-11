import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

const deviceContainers = {
  1: {
    img: "https://static.thenounproject.com/png/5650167-200.png",
    name: "Big Container",
    address:"/big"
  },
  2: {
    img: "https://static.thenounproject.com/png/5650167-200.png",
    name: "Small Container",
    address:"/small"
  },
  3: {
    img: "https://static.thenounproject.com/png/5650167-200.png",
    name: "Add Another Device",
    address:"/add"
  },
};
function Devices() {
  const renderDeviceContainer = (key) => {
    const { img, name,address } = deviceContainers[key];

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
          console.log(apiData);
          setIsEmpty(apiData && apiData[0].reading_1 > 6 || apiData[0].reading_1 < 2);
          // const isEmpty = apiData && apiData[0].reading_1 > 6 || apiData[0].reading_1 < 2;
          // console.log(isEmpty);
        })
        .catch(err => {
          console.log(err);
        });
    };

    return (<div>
        <Link to={address} style={{ textDecoration: "none" }}><div key={key} className="devices">
        <img src={img} alt={"Device ${key}"}></img>
        <h3>{name}</h3>
        <p>Empty: {isEmpty}</p>
      </div></Link>
    </div>
        
      
    );
  };
  return (
    <div className="content">
      {Object.keys(deviceContainers).map((key) => renderDeviceContainer(key))}
    </div>
  );
}
export default Devices;

<Link to="/" style={{ textDecoration: "none" }} >
  <div>
    <img
      className="footer-icon"
      src="src/images/iconmonstr-home-7-240.png"
      alt="Home"
    />
  </div>
</Link>

