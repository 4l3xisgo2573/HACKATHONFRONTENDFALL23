import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [clicked, setClicked] = useState(0);

  const handleClick = (index) => {
    setClicked(index);
  };

  return (
    <div className="footer">
      <ul>
        <li>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={() => handleClick(0)}
          >
            <div className={`icons ${clicked === 0 ? "clicked" : ""}`}>
              <img
                className="footer-icon"
                src="src/images/iconmonstr-home-7-240.png"
                alt="Home"
              />
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/deviceManager"
            style={{ textDecoration: "none" }}
            onClick={() => handleClick(1)}
          >
            <div className={`icons ${clicked === 1 ? "clicked" : ""}`}>
              <img
                className="footer-icon"
                src="src/images/iconmonstr-upload-12-240.png"
                alt="Devices"
              />
            </div>
          </Link>
        </li>
        {/* <li>
          <Link
            to="/insertText"
            style={{ textDecoration: "none" }}
            onClick={() => handleClick(2)}
          >
            <div className={`icons ${clicked === 2 ? "clicked" : ""}`}>
              <img
                className="footer-icon"
                src="src/images/iconmonstr-text-28-240.png"
                alt="Write Text"
              />
              <p>Write Text</p>
            </div>
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Footer;
