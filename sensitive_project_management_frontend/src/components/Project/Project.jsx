import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProjectManager = () => {
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

  // State to manage modal visibility and selected project
  const [selectedProject, setSelectedProject] = useState(null);

  // Remove a project
  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Open the modal with project details
  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Project Manager</h1>

      {/* Add Project Button */}
      <Link to="/add-project" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-200">
        Add Project
      </Link>

      {/* Display Projects */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 cursor-pointer transition duration-300 hover:shadow-xl hover:scale-105"
                onClick={() => openProjectDetails(project)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <div className="text-sm text-gray-500 mb-3">
                  <span className="mr-4">📅 {project.days} Days</span>
                  <span>👤 Assigned To: {project.assignedTo}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent closing modal when removing
                    removeProject(project.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            No projects added yet. Click "Add Project" to get started.
          </p>
        )}
      </div>

      {/* Modal for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedProject.title}</h2>
            <p className="text-sm text-gray-600 mt-4">{selectedProject.description}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">📅 {selectedProject.days} Days</p>
              <p className="text-sm text-gray-500">👤 Assigned To: {selectedProject.assignedTo}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-500 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
