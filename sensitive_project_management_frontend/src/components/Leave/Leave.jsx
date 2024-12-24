import React, { useState } from "react";
import axios from "axios";  // Import axios for HTTP requests

function Leave() {
  const [leave, setLeave] = useState({
    employee: "",
    leaveCategory: "",
    leaveType: "",
    permissionDate: "",
    startDate: "",
    endDate: "",
    timeRange: "",
    remarks: "",
    attachment: "",
    status: "",
    startTime: "",
    endTime: "",
  });

  // const employees = [
  //   { id: 1, name: "Puja" },
  //   { id: 2, name: "Jeyram" },
  //   { id: 3, name: "Aswin" },
  // ];
  const employees = ["Puja", "Jeyram", "Aswin", "Adiraj"];

  const leaveTypes = ["Sick Leave", "Casual Leave", "Emergency Leave", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/leaves/create", leave, {
        headers: {
          "Content-Type": "application/json",  // Set the content type header
        },
      });

      if (response.status === 201) {
        alert("Leave data submitted successfully!");
        // Optionally, reset the form after successful submission
        setLeave({
          employee: "",
          leaveCategory: "",
          leaveType: "",
          permissionDate: "",
          startDate: "",
          endDate: "",
          timeRange: "",
          remarks: "",
          attachment: "",
          status: "",
          startTime: "",
          endTime: "",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting the data.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-12">
      <h2 className="text-4xl font-bold mb-10 text-center mt-20">Leave Application Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Form Fields */}
        <div className="border border-blue-500 p-6 rounded-lg">
          <div className="space-y-8 pb-4">
            <div>
              <label className="block text-sm font-medium pb-4">Select Employee:</label>
              {/* <select
                name="employee"
                value={leave.employee}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select> */}


              <select
                name="employee"
                value={leave.employee}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              >
                <option value="">Select Employee</option>
                {employees.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Leave or Permission Radio Buttons */}
            <div className="pb-4">
              <label className="block text-sm font-medium pb-4">Leave or Permission:</label>
              <div className="flex space-x-4">
                <div>
                  <input
                    type="radio"
                    id="leave"
                    name="leaveCategory"
                    value="Leave"
                    onChange={handleChange}
                    checked={leave.leaveCategory === "Leave"}
                    className="mr-2"
                  />
                  <label htmlFor="leave">Leave</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="permission"
                    name="leaveCategory"
                    value="Permission"
                    onChange={handleChange}
                    checked={leave.leaveCategory === "Permission"}
                    className="mr-2"
                  />
                  <label htmlFor="permission">Permission</label>
                </div>
              </div>
            </div>

            {leave.leaveCategory === "Leave" && (
              <div>
                <label className="block text-sm font-medium pb-4">Leave Type:</label>
                <select
                  name="leaveType"
                  value={leave.leaveType}
                  onChange={handleChange}
                  required
                  className="border border-blue-300 p-2 w-full rounded"
                >
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {leave.leaveCategory === "Leave" && (
              <div>
                <label className="block text-sm font-medium pb-4">Leave Dates:</label>
                <div className="flex space-x-4">
                  <input
                    type="date"
                    name="startDate"
                    value={leave.startDate}
                    onChange={handleChange}
                    className="border border-blue-300 p-2 w-full rounded"
                    required
                  />
                  <span className="pt-2">to</span>
                  <input
                    type="date"
                    name="endDate"
                    value={leave.endDate}
                    onChange={handleChange}
                    className="border border-blue-300 p-2 w-full rounded"
                    required
                  />
                </div>
              </div>
            )}

            {/* Permission Date Input (only shown if "Permission" is selected) */}
            {leave.leaveCategory === "Permission" && (
              <div>
                <label className="block text-sm font-medium pb-4">Permission Date:</label>
                <input
                  type="date"
                  name="permissionDate"
                  value={leave.permissionDate}
                  onChange={handleChange}
                  className="border border-blue-300 p-2 w-full rounded"
                  required
                />
              </div>
            )}

            {/* Time Range Input (only shown if "Permission" is selected) */}
            {leave.leaveCategory === "Permission" && (
              <div>
                <label className="block text-sm font-medium pb-4">Time Range:</label>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    name="startTime"
                    value={leave.startTime}
                    onChange={handleChange}
                    className="border border-blue-300 p-2 w-full rounded"
                    required
                  />
                  <span className="pt-2">to</span>
                  <input
                    type="time"
                    name="endTime"
                    value={leave.endTime}
                    onChange={handleChange}
                    className="border border-blue-300 p-2 w-full rounded"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Second Column */}
        <div className="border border-blue-500 p-6 rounded-lg">
          <div className="space-y-8 pb-4">
            <div>
              <label className="block text-sm font-medium pb-4">Remarks:</label>
              <textarea
                name="remarks"
                value={leave.remarks}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
                placeholder="Add any remarks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Attachment:</label>
              <input
                type="file"
                name="attachment"
                onChange={handleChange}
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Status:</label>
              <select
                name="status"
                value={leave.status}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#2563eb] text-white border border-black px-8 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Leave;
