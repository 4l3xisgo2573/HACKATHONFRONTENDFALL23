import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

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
  // 3: {
  //   img: "https://static.thenounproject.com/png/5650167-200.png",
  //   name: "Add Another Device",
  //   address:"/add"
  // },
};

function Devices() {
  const renderDeviceContainer = (key) => {
    const { img, name, address } = deviceContainers[key];

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
            .sort((a, b) => b.timestamp - a.timestamp);
  
          const lastEightValues = sortedData.map(item => item.reading).slice(-8);
  
          setApiData(lastEightValues);

          const isEmptyValue = lastEightValues && lastEightValues[0] > 6 || lastEightValues[0] < 2;
          setIsEmpty(isEmptyValue);
        })
        .catch(err => {
          console.log(err);
        });
    };

    return (
      <div>
        <Link to={address} style={{ textDecoration: "none" }}>
          <div key={key} className="devices">
            <img src={img} alt={`Device ${key}`} />
            <div className="device-info">
              <h3>{name}</h3>
              <p  className="margin-left: 10px;">
                Status: <br />
                {isEmpty ? 'Empty' : 'Full'}
              </p>
            </div>
          </div>
        </Link>
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
