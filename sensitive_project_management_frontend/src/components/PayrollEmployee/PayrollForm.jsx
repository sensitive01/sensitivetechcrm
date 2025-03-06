import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PayrollForm = ({ onSubmit }) => {
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    branch: "",
    workingDays: 28,
    salary: 0,
    present: 0,
    absent: 0,
    lateDays: 0,
    lateMins: 0,
    allowances: 0,
    deductions: 0,
    advance: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      console.log("Fetching data for employee:", id);
  
      axios
        .get(`https://sensitivetechcrm.onrender.com/employeedatabyid/${id}`)
        .then((response) => {
          console.log("API Response:", response.data);
  
          if (response.data.success) {
            const data = response.data.data;
            setFormData({
              name: data.name || "",
              empId: data.empId || "",
              branch: data.department || "", // 'department' in API maps to 'branch' in your form
              workingDays: data.currentMonth.workingDays || 28,
              salary: Number(data.salary) || 0,
              present: data.currentMonth.present || 0,
              absent: data.currentMonth.absent || 0,
              lateDays: data.currentMonth.lateDays || 0,
              lateMins: parseInt(data.currentMonth.lateTime) || 0, // Parse lateTime if needed
              allowances: data.currentMonth.totalAllowances || 0,
              deductions: data.currentMonth.totalDeductions || 0,
              advance: data.currentMonth.totalAdvances || 0,
            });
          } else {
            setError("Invalid employee data");
          }
  
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching employee data:", err);
          setError("Failed to fetch employee data");
          setLoading(false);
        });
    }
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["name", "empId", "branch"].includes(name) ? value : Number(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payable = formData.salary + formData.allowances - formData.deductions - formData.advance;
    onSubmit({ ...formData, payable });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-24">Add Payroll Record</h2>

      {loading ? <p>Loading...</p> : error ? <p className="text-red-600">{error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={["name", "empId", "branch"].includes(key) ? "text" : "number"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={key !== "branch"}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayrollForm;
