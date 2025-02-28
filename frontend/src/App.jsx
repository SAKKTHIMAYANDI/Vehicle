import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewComponents from "./pages/ViewComponents";
import Components from "./pages/Components";

import Vehicles from "./pages/Vehicles";
import Issues from "./pages/Issues";
import ViewIssues from "./pages/ViewIssues";
import ViewVehicles from "./pages/ViewVehicles";
import ViewInvoices from "./pages/ViewInvoices";
import EditVehicle from "./pages/EditVehicle";  // New Edit Page
import EditIssue from "./pages/EditIssue";  // Create this component
import EditInvoice from "./pages/EditInvoice";

import Services from "./pages/Services";
import Revenue from "./pages/Revenue";
import EditComponent from "./pages/EditComponent";  // New edit page


function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-components" element={<ViewComponents />} />
          <Route path="/components" element={<Components />} />

          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/view-vehicles" element={<ViewVehicles />} />

          <Route path="/issues" element={<Issues />} />
          <Route path="/view-issues" element={<ViewIssues />} />

          <Route path="/services" element={<Services />} />
          <Route path="/view-invoices" element={<ViewInvoices />} />
          <Route path="/edit/:id" element={<EditComponent />} />
          <Route path="/api/vehicles/:id" element={<EditVehicle />} />
          <Route path="/edit-issue/:id" element={<EditIssue />} />  {/* Edit page route */}
          <Route path="/edit-invoice/:id" element={<EditInvoice />} />

          <Route path="/revenue" element={<Revenue />} />
        </Routes>
      </Router>
  );
}

export default App;
