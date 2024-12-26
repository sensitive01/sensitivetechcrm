import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { employeename, getTheTask } from "../../api/services/projectServices";
import axios from "axios";

function TaskEdit() {
  const { taskId } = useParams();
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

  const [projects, setprojects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch employees and project names concurrently using Promise.all
        const [employeesResponse, projectsResponse] = await Promise.all([
          employeename(), // Assuming employeename() returns the employees data
          axios.get("http://localhost:3000/project/projectname") // Fetching project names
        ]);

        console.log("Employees fetched:", employeesResponse);
        console.log("Projects fetched:", projectsResponse);

        if (employeesResponse && projectsResponse) {
          setEmployees(employeesResponse.data); // Set employees
          const flattenedProjects = projectsResponse.data.flatMap(project =>
            project.projectDetails.map(detail => ({
              _id: project._id,
              projectName: detail.projectName // Flatten and extract project name
            }))
          );
          setprojects(flattenedProjects); // Set project names
          setError(null);
        } else {
          throw new Error("Failed to fetch employees or projects.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await getTheTask(taskId);
        console.log(response)

        if (response.status===200) {
          setTask(response.data.task)
          // setTask({
          //   project: response.data.project,
          //   task: response.data.task,
          //   empId: response.data.empId,
          //   description: response.data.description,
          //   timeline: response.data.timeline,
          //   status: response.data.status,
          //   date: response.data.date,
          //   attachments: response.data.attachments || null,
          // });
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
  
    const formData = new FormData();
  
    Object.keys(task).forEach((key) => {
      if (key === "attachments" && task[key]) {
        Array.from(task[key]).forEach((file) => {
          formData.append("attachments", file);
        });
      } else {
        formData.append(key, task[key]);
      }
    });
  
    try {
      // Call the API to update the task
      const result = await getTheTask(taskId, formData);
  
      // Handle the response
      console.log("Task updated:", result);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the task.");
    }
  };
  
  

  if (loading) {
    return (
      <div className="container mx-auto p-8 mt-20 text-center">
        <p className="text-xl">Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 mt-20 text-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }


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
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.projectName}
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
