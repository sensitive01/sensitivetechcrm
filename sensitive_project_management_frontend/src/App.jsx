import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Topbar from "./components/Topbar/Topbar";
import EmployeeTable from "./components/Employee/EmployeeTable";
import Employee from "./components/Employee/Employee";
import LoginPage from "./components/Login/Login";
import SignUp from "./assets/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route - No Topbar */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Layout - With Topbar */}
        <Route
          path="/*"
          element={
            <div className="app">
              <Topbar />
              <div className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employee-table" element={<EmployeeTable />} />
                  <Route path="/employee-form" element={<Employee />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
