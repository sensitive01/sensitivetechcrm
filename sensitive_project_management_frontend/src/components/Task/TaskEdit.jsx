import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TaskEdit() {
  const { taskId } = useParams(); // Get task ID from URL params
  const [task, setTask] = useState({
    project: "",
    task: "",
    empId: "",
    description: "",
    timeline: "",
    status: "Pending",
    date: "",
    attachments: null,
  });

  // Manually inserted data for Projects and Employees
  const projects = [
    { id: "1", name: "ParkMyWheels" },
    { id: "2", name: "Capilary" },
    { id: "3", name: "Mindmentors" },
  ];

  const employees = [
    { id: "101", name: "Aswinraj" },
    { id: "102", name: "Rakesh N" },
    { id: "103", name: "Jeyaram" },
  ];

  // Fetch the task data using useEffect
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/task/gettask/${taskId}`);
        const data = await response.json();

        if (response.ok) {
          setTask({
            project: data.project,
            task: data.task,
            empId: data.empId,
            description: data.description,
            timeline: data.timeline,
            status: data.status,
            date: data.date,
            attachments: data.attachments || null,
          });
        } else {
          alert("Failed to fetch task data.");
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
        alert("An error occurred while fetching task data.");
      }
    };

    if (taskId) {
      fetchTaskData();
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTask((prev) => ({ ...prev, attachments: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();

    // Append all form fields
    Object.keys(task).forEach((key) => {
      if (key === "attachments" && task[key]) {
        // For attachments, append all files
        Array.from(task[key]).forEach((file) => {
          formData.append("attachments", file);
        });
      } else {
        formData.append(key, task[key]);
      }
    });

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:3000/task/updatetask", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log("Task updated:", result);
        alert("Task updated successfully!");
      } else {
        // Handle error (e.g., show an error message)
        console.error("Error:", result);
        alert("Failed to update task.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the task.");
    }
  };

  return (
    <div className="container mx-auto p-8 mt-20">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Form</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 border rounded-lg shadow-lg max-w-4xl mx-auto"
      >
        {/* Task Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Project:</label>
            <select
              name="project"
              value={task.project}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Task */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Task:</label>
            <input
              type="text"
              name="task"
              value={task.task}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* EmpID */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Employee:</label>
            <select
              name="empId"
              value={task.empId}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Description:</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Timeline:</label>
            <input
              type="text"
              name="timeline"
              value={task.timeline}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Status:</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Date:</label>
            <input
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium pb-2 text-gray-600">Attachments:</label>
            <input
              type="file"
              name="attachments"
              onChange={handleFileChange}
              multiple
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEdit;
