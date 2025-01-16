import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import TaskForm from "./components/Task/TaskForm";
import ProjectForm from "./components/Project/ProjectForm";
import ClientEdit from "./components/Client/ClientEdit";
import LeaveEdit from "./components/Leave/LeaveEdit";
import EmployeeEdit from "./components/Employee/EmployeeEdit";
import AdminForm from "./components/Admin/AdminForm";
import TaskEdit from "./components/Task/TaskEdit";
import ProjectEdit from "./components/Project/ProjectEdit";
import LeadForm from "./components/Leads/Leads";
import LeadTable from "./components/Leads/LeadTable";
import Payroll from "./components/Payroll/Payroll";
import PayrollTable from "./components/Payroll/PayrollTable";
import PayrollEdit from "./components/Payroll/PayrollEdit";

// Preloader Component
const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-[#DA2F49] flex items-center justify-center z-50">
      <img
        src="/preloader.gif"
        alt="Loading..."
        className="w-24 h-24 rounded-[30px]"  // Add border-radius here
      />
    </div>
  );
};


// Route Transition Component
const RouteTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Hide preloader after 5 seconds

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {isLoading && <Preloader />}
      {!isLoading && children}
    </>
  );
};

// Layout Component for Admin Pages
const AdminLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Allow the layout to show after 5 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {!isLoading && <Topbar />}
      <div className="main-content">
        <RouteTransition>{children}</RouteTransition>
      </div>
    </div>
  );
};

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <RouteTransition>
                <LoginPage />
              </RouteTransition>
            }
          />
          <Route
            path="/signup"
            element={
              <RouteTransition>
                <SignUp />
              </RouteTransition>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              role === "employee" ? (
                <AdminLayout>
                  <Routes>
                    {/* Employee-Specific Routes */}
                    <Route
                      path="/attendance-table"
                      element={<RouteTransition><AttendanceTable /></RouteTransition>}
                    />
                    <Route
                      path="/attendance-form"
                      element={<RouteTransition><EmployeeAttendance /></RouteTransition>}
                    />
                    <Route
                      path="/leave-table"
                      element={<RouteTransition><LeaveTable /></RouteTransition>}
                    />
                    <Route
                      path="/task"
                      element={<RouteTransition><TaskList /></RouteTransition>}
                    />
                    <Route
                      path="/project"
                      element={<RouteTransition><ProjectManager /></RouteTransition>}
                    />
                  </Routes>
                </AdminLayout>
              ) : (
                <AdminLayout>
                  <Routes>
                    {/* Admin-Specific Routes */}
                    <Route
                      path="/admin"
                      element={<RouteTransition><AdminForm /></RouteTransition>}
                    />
                    <Route
                      path="/dashboard"
                      element={<RouteTransition><Dashboard /></RouteTransition>}
                    />
                    <Route
                      path="/employee-table"
                      element={<RouteTransition><EmployeeTable /></RouteTransition>}
                    />
                    <Route
                      path="/employee-form"
                      element={<RouteTransition><Employee /></RouteTransition>}
                    />
                    <Route
                      path="/employee-edit/:id"
                      element={<RouteTransition><EmployeeEdit /></RouteTransition>}
                    />
                    <Route
                      path="/task"
                      element={<RouteTransition><TaskList /></RouteTransition>}
                    />
                    <Route
                      path="/project"
                      element={<RouteTransition><ProjectManager /></RouteTransition>}
                    />
                    <Route
                      path="/add-project"
                      element={<RouteTransition><ProjectForm /></RouteTransition>}
                    />
                    <Route
                      path="/edit-project/:projectId"
                      element={<RouteTransition><ProjectEdit /></RouteTransition>}
                    />
                    <Route
                      path="/client-table"
                      element={<RouteTransition><ClientTable /></RouteTransition>}
                    />
                    <Route
                      path="/client-edit/:id"
                      element={<RouteTransition><ClientEdit /></RouteTransition>}
                    />
                    <Route
                      path="/client-form"
                      element={<RouteTransition><Client /></RouteTransition>}
                    />
                    <Route
                      path="/attendance-table"
                      element={<RouteTransition><AttendanceTable /></RouteTransition>}
                    />
                    <Route
                      path="/attendance-form"
                      element={<RouteTransition><EmployeeAttendance /></RouteTransition>}
                    />
                    <Route
                      path="/leave"
                      element={<RouteTransition><Leave /></RouteTransition>}
                    />
                    <Route
                      path="/leave-table"
                      element={<RouteTransition><LeaveTable /></RouteTransition>}
                    />
                    <Route
                      path="/leave-edit/:id"
                      element={<RouteTransition><LeaveEdit /></RouteTransition>}
                    />
                    <Route
                      path="/task-form"
                      element={<RouteTransition><TaskForm /></RouteTransition>}
                    />
                    <Route
                      path="/task-edit/:taskId"
                      element={<RouteTransition><TaskEdit /></RouteTransition>}
                    />
                    <Route
                      path="/lead-form"
                      element={<RouteTransition><LeadForm /></RouteTransition>}
                    />
                    <Route
                      path="/lead-table"
                      element={<RouteTransition><LeadTable /></RouteTransition>}
                    />
                    <Route
                      path="/payroll-form"
                      element={<RouteTransition><Payroll /></RouteTransition>}
                    />
                    <Route
                      path="/payroll-table"
                      element={<RouteTransition><PayrollTable /></RouteTransition>}
                    />
                    <Route
                      path="/payroll-edit/:id"
                      element={<RouteTransition><PayrollEdit /></RouteTransition>}
                    />
                  </Routes>
                </AdminLayout>
              )
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
