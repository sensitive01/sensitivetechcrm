import React, { useState, useEffect } from "react";
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
import Preloader from "./components/preloader/Preloader"; // Import Preloader
import LeadEdit from "./components/Leads/LeadEdit";
import Payments from "./components/Payments/Payments";
import PaymentTable from "./components/Payments/PaymentTable";
import Expenses from "./components/Expenses/Expenses";
import ExpenseTable from "./components/Expenses/ExpensesTable";
import ExpensesEdit from "./components/Expenses/ExpensesEdit";
import PaymentEdit from "./components/Payments/PaymentEdit";
import AdjustmentTable from "./components/Adjustment/AdjustmentTable";
import Adjustment from "./components/Adjustment/Adjustment";
import AdjustmentEdit from "./components/Adjustment/AdjustmentEdit";
import MoM from "./components/MoM/MoM";
// import DispositionForm from "./components/UpdateLog/UpdateLog";

// Route Transition Component
const RouteTransition = ({ children }) => {
  return <>{children}</>;
};

// Layout Component for Admin Pages
const AdminLayout = ({ children, loading }) => {
  return (
    <div className="app">
      {loading && <Preloader />} {/* Show Preloader over the whole layout */}
      {!loading && <Topbar />}  {/* Show Topbar only after loading is complete */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <RoutesWithPreloader role={role} /> {/* Move the logic into a child component */}
    </Router>
  );
}

const RoutesWithPreloader = ({ role }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    // Trigger preloader for specific routes
    const loadingRoutes = [
      '/dashboard', // Add this to include dashboard in preloading
      '/employee-table',
      '/attendance-table',
      '/leave-table',
      '/task',
      '/project',
      '/client-table',
      '/lead-table',
      '/adjustment-table',
      '/payments-table',
      '/payroll-table',
      '/expense-table',
    ];

    if (loadingRoutes.includes(location.pathname)) {
      setLoading(true);  // Set loading to true when the route matches
      setTimeout(() => {
        setLoading(false);  // Hide preloader after 2 seconds
      }, 2000);
    } else {
      setLoading(false); // Hide preloader for non-matching routes
    }
  }, [location]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            role === "employee" ? (
              <AdminLayout loading={loading}> {/* Pass loading as prop */}
                <Routes>
                  {/* Employee-Specific Routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/attendance-table" element={<AttendanceTable />} />
                  <Route path="/attendance-form" element={<EmployeeAttendance />} />
                  <Route path="/leave-table" element={<LeaveTable />} />
                  <Route path="/leave" element={<Leave />} />
                  <Route path="/leave-edit/:id" element={<LeaveEdit />} />
                  <Route path="/task" element={<TaskList />} />
                  <Route path="/task-form" element={<TaskForm />} />
                  <Route path="/task-edit/:taskId" element={<TaskEdit />} />
                  <Route path="/project" element={<ProjectManager />} />
                  <Route path="/add-project" element={<ProjectForm />} />
                  <Route path="/edit-project/:projectId" element={<ProjectEdit />} />
                  <Route path="/mom" element={<MoM />} />
                </Routes>
              </AdminLayout>
            ) : (
              <AdminLayout loading={loading}> {/* Pass loading as prop */}
                <Routes>
                  {/* Admin-Specific Routes */}
                  <Route path="/admin" element={<AdminForm />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employee-table" element={<EmployeeTable />} />
                  <Route path="/employee-form" element={<Employee />} />
                  <Route path="/employee-edit/:id" element={<EmployeeEdit />} />
                  <Route path="/task" element={<TaskList />} />
                  <Route path="/project" element={<ProjectManager />} />
                  <Route path="/add-project" element={<ProjectForm />} />
                  <Route path="/edit-project/:projectId" element={<ProjectEdit />} />
                  <Route path="/client-table" element={<ClientTable />} />
                  <Route path="/client-edit/:id" element={<ClientEdit />} />
                  <Route path="/client-form" element={<Client />} />
                  <Route path="/attendance-table" element={<AttendanceTable />} />
                  <Route path="/attendance-form" element={<EmployeeAttendance />} />
                  <Route path="/leave" element={<Leave />} />
                  <Route path="/leave-table" element={<LeaveTable />} />
                  <Route path="/leave-edit/:id" element={<LeaveEdit />} />
                  <Route path="/task-form" element={<TaskForm />} />
                  <Route path="/task-edit/:taskId" element={<TaskEdit />} />
                  <Route path="/lead-form" element={<LeadForm />} />
                  <Route path="/lead-table" element={<LeadTable />} />
                  <Route path="/lead-edit/:id" element={<LeadEdit />} />
                  <Route path="/adjustment-form" element={<Adjustment />} />
                  <Route path="/adjustment-table" element={<AdjustmentTable />} />
                  <Route path="/adjustment-edit/:id" element={<AdjustmentEdit />} />
                  <Route path="/payments-form" element={<Payments />} />
                  <Route path="/payments-table" element={<PaymentTable />} />
                  <Route path="/payments-edit/:id" element={<PaymentEdit />} />
                  <Route path="/expense-form" element={<Expenses />} />
                  <Route path="/expense-table" element={<ExpenseTable />} />
                  <Route path="/expense-edit/:id" element={<ExpensesEdit />} />
                  <Route path="/mom" element={<MoM />} />
                  {/* <Route path="/updatelog" element={<DispositionForm />} /> */}
                </Routes>
              </AdminLayout>
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;


