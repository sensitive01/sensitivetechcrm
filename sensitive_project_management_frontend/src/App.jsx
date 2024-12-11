import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Topbar from "./components/Topbar/Topbar";
import EmployeeTable from "./components/Employee/EmployeeTable";
import Employee from "./components/Employee/Employee";
import LoginPage from "./components/Login/Login";
import SignUp from "./assets/SignUp";
import TaskList from "./components/Task/Task";
import ProjectManager from "./components/Project/Project";
import ClientTable from "./components/Client/ClientTable";
import Client from "./components/Client/Client";
import AttendanceTable from "./components/AttendanceTable/AttendanceTable";
import EmployeeAttendance from "./components/AttendanceTable/EmployeeAttendance";
import Leave from "./components/Leave/Leave";
import LeaveTable from "./components/Leave/LeaveTable";
import TaskForm from "./components/Task/TaskForm"; // Added TaskForm import
import ProjectForm from "./components/Project/ProjectForm";
import EmployeeEdit from "./components/Employee/EmployeeEdit";

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
                <Route path="/employee-edit/:id" element={<EmployeeEdit />} />
                <Route path="/task" element={<TaskList />} />
                <Route path="/project" element={<ProjectManager />} />
                <Route path="/add-project" element={<ProjectForm />} />
                <Route path="/client-table" element={<ClientTable />} />
                <Route path="/client-form" element={<Client />} />
                <Route path="/attendance-table" element={<AttendanceTable />} />
                <Route path="/attendance-form" element={<EmployeeAttendance />} />
                <Route path="/leave" element={<Leave />} />
                <Route path="/leave-table" element={<LeaveTable />} />
                <Route path="/task-form" element={<TaskForm />} /> {/* Added TaskForm route */}
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
