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
      <Topbar />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-table" element={<EmployeeTable />} />
        <Route path="/employee-form" element={<Employee />} />
        <Route path="/login" element={<LoginPage/>} />

        <Route path="/signup" element={<SignUp />} />

        {/* Add additional routes for other components */}
      </Routes>
    </Router>
  );
}

export default App;
