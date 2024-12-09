import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectForm = ({ setProjects }) => {
  const [newProject, setNewProject] = useState({
    projectName: "",
    type: "",
    requirements: "",
    description: "",
    category: "",
    techStack: "",
    domain: "",
    designation: "",
    addOnServices: "",
    duration: "",
    quotedValue: "",
    approvedValue: "",
    paymentTerms: "",
    finalQuotation: "",
    taxTerms: "",
    dependencies: "",
    projectDocument: null,
    nda: null,
    msa: null,
    assignedTo: "",
    status: "",
    createdDate: new Date().toISOString().split("T")[0], // Default to today's date
  });

  const navigate = useNavigate();

  const assignableUsers = ["John Doe", "Jane Smith", "Team Alpha", "Team Beta"];
  const statuses = ["Not Started", "In Progress", "Completed", "On Hold"];

  const handleAddProject = () => {
    if (
      newProject.projectName &&
      newProject.type &&
      newProject.description &&
      newProject.category &&
      newProject.techStack &&
      newProject.assignedTo &&
      newProject.status
    ) {
      setProjects((prevProjects) => [
        ...prevProjects,
        { ...newProject, id: Date.now() },
      ]);
      navigate("/"); // Navigate back to the project manager page
    } else {
      alert("Please fill out all mandatory fields!");
    }
  };

  const handleFileChange = (e, field) => {
    setNewProject({ ...newProject, [field]: e.target.files[0] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex justify-center items-center mt-16">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Add New Project
        </h1>

        <form className="space-y-10">
          {/* Section 1: Project Details */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Project Details
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Project Name", field: "projectName", type: "text" },
                { label: "Type", field: "type", type: "text" },
                { label: "Requirements", field: "requirements", type: "textarea" },
                { label: "Description", field: "description", type: "textarea" },
                { label: "Category", field: "category", type: "text" },
                { label: "Tech Stack", field: "techStack", type: "text" },
                { label: "Domain", field: "domain", type: "text" },
                { label: "Designation", field: "designation", type: "text" },
                { label: "Add-On Services", field: "addOnServices", type: "text" },
                { label: "Duration (in days)", field: "duration", type: "number" },
                { label: "Dependencies", field: "dependencies", type: "textarea" },
              ].map(({ label, field, type }) => (
                <div key={field} className={type === "textarea" ? "col-span-2" : ""}>
                  <label className="block text-gray-600 mb-1 font-medium">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      placeholder={`Enter ${label.toLowerCase()}`}
                      value={newProject[field]}
                      onChange={(e) =>
                        setNewProject({ ...newProject, [field]: e.target.value })
                      }
                      className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={type}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      value={newProject[field]}
                      onChange={(e) =>
                        setNewProject({ ...newProject, [field]: e.target.value })
                      }
                      className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
          
          <section>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Quoted Value", field: "quotedValue", type: "number" },
                { label: "Approved Value", field: "approvedValue", type: "number" },
                { label: "Final Quotation", field: "finalQuotation", type: "number" },
                { label: "Tax Terms", field: "taxTerms", type: "textarea" },
                { label: "Payment Terms", field: "paymentTerms", type: "textarea" },
              ].map(({ label, field, type }) => (
                <div key={field} className={type === "textarea" ? "col-span-2" : ""}>
                  <label className="block text-gray-600 mb-1 font-medium">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      placeholder={`Enter ${label.toLowerCase()}`}
                      value={newProject[field]}
                      onChange={(e) =>
                        setNewProject({ ...newProject, [field]: e.target.value })
                      }
                      className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={type}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      value={newProject[field]}
                      onChange={(e) =>
                        setNewProject({ ...newProject, [field]: e.target.value })
                      }
                      className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </div>
              ))}

              {/* File Uploads */}
              {[
                { label: "Project Document", field: "projectDocument" },
                { label: "NDA Document", field: "nda" },
                { label: "MSA Document", field: "msa" },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-gray-600 mb-1 font-medium">
                    {label}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, field)}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}

              {/* Assign To */}
              <div>
                <label className="block text-gray-600 mb-1 font-medium">
                  Assign To
                </label>
                <select
                  value={newProject.assignedTo}
                  onChange={(e) =>
                    setNewProject({ ...newProject, assignedTo: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select an assignee</option>
                  {assignableUsers.map((user, index) => (
                    <option key={index} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-600 mb-1 font-medium">
                  Status
                </label>
                <select
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject({ ...newProject, status: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a status</option>
                  {statuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Created Date */}
              <div>
                <label className="block text-gray-600 mb-1 font-medium">
                  Created Date
                </label>
                <input
                  type="date"
                  value={newProject.createdDate}
                  onChange={(e) =>
                    setNewProject({ ...newProject, createdDate: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProject}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
