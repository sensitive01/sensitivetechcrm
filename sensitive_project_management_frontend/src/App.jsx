import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Topbar from "./components/Topbar/Topbar";
import EmployeeTable from "./components/Employee/EmployeeTable";
import Employee from "./components/Employee/Employee";
import LoginPage from "./components/Login/Login";
import SignUp from "./assets/SignUp";
import TaskList from "./components/Task/Task";
import TaskForm from "./components/Task/TaskForm";
import ProjectManager from "./components/Project/Project";
import ProjectForm from "./components/Project/ProjectForm";

// Layout Component for Admin Pages
const AdminLayout = ({ children }) => (
  <div className="app">
    <Topbar />
    <div className="main-content">{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route
          path="/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee-table" element={<EmployeeTable />} />
                <Route path="/employee-form" element={<Employee />} />
                <Route path="/task" element={<TaskList />} />
                <Route path="/task-form" element={<TaskForm />} />
                <Route path="/project" element={<ProjectManager/>} />
                <Route path="/add-project" element={<ProjectForm/>} />

              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
