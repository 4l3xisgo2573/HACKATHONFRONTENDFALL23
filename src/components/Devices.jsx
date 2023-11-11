import React from "react";
import { Link } from "react-router-dom";
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
    return (<div>
        <Link to={address} style={{ textDecoration: "none" }}><div key={key} className="devices">
        <img src={img} alt={"Device ${key}"}></img>
        <h3>{name}</h3>
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

