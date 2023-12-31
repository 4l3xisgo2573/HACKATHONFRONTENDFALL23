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
import Big from "./components/Big";
import Small from "./components/Small";


function App() {
  return (
    <>
      <div className="container">
        <Router>
          <Header></Header>
          <Routes>
            <Route exact path="/" element={<Devices />} />
            <Route path="/deviceManager" element={<Home />} />
            <Route path="/big" element={<Big />} />
            <Route path="/small" element={<Small />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer></Footer>
        </Router>
      </div>
    </>
  );
}

export default App;
