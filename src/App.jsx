import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Devices from "./components/Devices";
import DeviceScreen from "./components/DeviceScreen";
import { Link } from "react-router-dom"; // Add this import


function App() {
  return (
    <>
      <div className="container">
      
        <Router>
          <Header></Header>
          <Routes>
            <Route exact path="/" element={<Devices />} />
            <Route path="/deviceManager" element={<Home />} />
            <Route path="/bigContainer" element={<DeviceScreen />} />
            <Route path="/smallContainer" element={<DeviceScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer></Footer>
        </Router>
      </div>
    </>
  );
}

export default App;
