

import React, { useState } from "react";

const ProjectManager = () => {
  // Default data for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "ParkMyWheels",
      description: "A platform to manage parking spots efficiently.",
      days: 15,
      assignedTo: "John Doe",
    },
    {
      id: 2,
      title: "Capillary",
      description: "A CRM solution to enhance customer engagement.",
      days: 30,
      assignedTo: "Team Alpha",
    },
    {
      id: 3,
      title: "MindMentors",
      description: "An online mentoring platform for personal growth.",
      days: 20,
      assignedTo: "Jane Smith",
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    days: "",
    assignedTo: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // List of assignable users (could come from an API or state)
  const assignableUsers = ["John Doe", "Jane Smith", "Team Alpha", "Team Beta"];

  // Add a new project
  const addProject = () => {
    if (
      newProject.title &&
      newProject.description &&
      newProject.days &&
      newProject.assignedTo
    ) {
      setProjects([...projects, { ...newProject, id: Date.now() }]); // Add project with unique ID
      setNewProject({ title: "", description: "", days: "", assignedTo: "" }); // Reset input fields
      setIsModalOpen(false); // Close modal
    } else {
      alert("Please fill out all fields before adding a project!");
    }
  };

  // Remove a project
  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Project Manager</h1>

      {/* Add Project Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Project
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
            <div className="space-y-4">
              {/* Project Title */}
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="border p-2 rounded w-full"
              />

              {/* Project Description */}
              <input
                type="text"
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="border p-2 rounded w-full"
              />

              {/* Days to Complete */}
              <input
                type="number"
                placeholder="Days to Complete"
                value={newProject.days}
                onChange={(e) =>
                  setNewProject({ ...newProject, days: e.target.value })
                }
                className="border p-2 rounded w-full"
              />

              {/* Assign To Dropdown */}
              <select
                value={newProject.assignedTo}
                onChange={(e) =>
                  setNewProject({ ...newProject, assignedTo: e.target.value })
                }
                className="border p-2 rounded w-full"
              >
                <option value="">Assign To</option>
                {assignableUsers.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addProject}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Projects */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {project.description}
                </p>
                <div className="text-sm text-gray-400 mb-2">
                  <span>📅 {project.days} Days</span>
                </div>
                <div className="text-sm text-gray-400">
                  <span>👤 Assigned To: {project.assignedTo}</span>
                </div>
                <button
                  onClick={() => removeProject(project.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No projects added yet. Click "Add Project" to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
