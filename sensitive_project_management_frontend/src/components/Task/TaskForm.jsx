import React, { useState } from "react";

function TaskForm() {
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

  // Sample data for Projects and Employees
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTask((prev) => ({ ...prev, attachments: e.target.files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...task,
      timeline: task.timeline.split(",").map((t) => t.trim()),
    });
    // Add backend integration here
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

export default TaskForm;
