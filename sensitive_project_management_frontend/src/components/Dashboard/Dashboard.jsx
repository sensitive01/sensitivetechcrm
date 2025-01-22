import React, { useState, useEffect } from "react";
import {
  getTotalEmployees,
  getAttendance,
  getTotalProjects,
  getTasks,
  getClients,
  getLeave,
  getTotalLeads, // Add this import
  getTotalPayrolls, // Add this import
} from "../../api/services/projectServices";

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [clients, setClients] = useState(0);
  const [leave, setLeave] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0); // State for total leads
  const [totalPayrolls, setTotalPayrolls] = useState(0); // State for total payrolls
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const role = localStorage.getItem("role"); // Retrieve role from localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data including leads and payrolls
        const [empRes, attRes, projRes, taskRes, clientRes, leaveRes, leadsRes, payrollRes] = await Promise.all([
          getTotalEmployees(),
          getAttendance(),
          getTotalProjects(),
          getTasks(),
          getClients(),
          getLeave(),
          getTotalLeads(), // Fetch leads data
          getTotalPayrolls(), // Fetch payrolls data
        ]);

        // Set state for each metric
        if (empRes.status === 200) setTotalEmployees(empRes.data.TotalEmployee);
        if (attRes.status === 200) setAttendance(attRes.data.TotalAttendance);
        if (projRes.status === 200) setTotalProjects(projRes.data.TotalProjects);
        if (taskRes.status === 200) setTasks(taskRes.data.TotalTasks);
        if (clientRes.status === 200) setClients(clientRes.data.TotalClients);
        if (leaveRes.status === 200) setLeave(leaveRes.data.TotalLeaveRequests);
        if (leadsRes.status === 200) setTotalLeads(leadsRes.data.TotalLeads); // Set leads data
        if (payrollRes.status === 200) setTotalPayrolls(payrollRes.data.TotalPayrolls); // Set payroll data

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-32 px-28">
      {/* Total Employee - Visible only to Superadmin */}
      {role === "Superadmin" && (
        <Card
          title="Total Employee"
          value={totalEmployees}
          loading={loading}
          error={error}
          iconColor="green"
        />
      )}

      {/* Attendance */}
      <Card
        title="Attendance"
        value={attendance}
        loading={loading}
        error={error}
        iconColor="blue"
      />

      {/* Total Projects */}
      <Card
        title="Total Projects"
        value={totalProjects}
        loading={loading}
        error={error}
        iconColor="orange"
      />

      {/* Tasks */}
      <Card
        title="Tasks"
        value={tasks}
        loading={loading}
        error={error}
        iconColor="blue"
      />

      {/* Clients - Visible only to Superadmin */}
      {role === "Superadmin" && (
        <Card
          title="Clients"
          value={clients}
          loading={loading}
          error={error}
          iconColor="orange"
        />
      )}

      {/* Leave */}
      <Card
        title="Leave"
        value={leave}
        loading={loading}
        error={error}
        iconColor="orange"
      />

      {/* Total Leads */}
      <Card
        title="Total Leads"
        value={totalLeads}
        loading={loading}
        error={error}
        iconColor="purple" // Example color, you can change it
      />

      {/* Total Payrolls */}
      <Card
        title="Total Payrolls"
        value={totalPayrolls}
        loading={loading}
        error={error}
        iconColor="pink" // Example color, you can change it
      />
    </div>
  );
}

// Card Component for reusability
const Card = ({ title, value, loading, error, iconColor }) => (
  <div className="bg-white rounded-xl shadow-2xl p-8">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-1xl text-gray-800">{title}</h3>
        {loading ? (
          <p className="text-2xl text-gray-800 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-2xl text-red-500 mt-4">{error}</p>
        ) : (
          <p className="text-2xl font-bold text-gray-800 mt-4">{value}</p>
        )}
      </div>
      <div className={`p-5 bg-${iconColor}-100 rounded-full shadow-lg`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-10 w-10 text-${iconColor}-500`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
);
