import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Vehicles from "./pages/Vehicles";
import Issues from "./pages/Issues";
import Services from "./pages/Services";
import Revenue from "./pages/Revenue";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/services" element={<Services />} />
          <Route path="/revenue" element={<Revenue />} />
        </Routes>
      </Router>
  );
}

export default App;
