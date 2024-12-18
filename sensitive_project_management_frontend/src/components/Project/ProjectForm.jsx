import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

const ProjectForm = ({ setProjects }) => {
  const [additionalDetails, setAdditionalDetails] = useState([
    {
      projectDocument: null,
      nda: null,
      msa: null,
      assignedTo: "",
      status: "",
      createdDate: new Date().toISOString().split("T")[0],
    }
  ]);

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
    additionalDetails: additionalDetails
  });

  const navigate = useNavigate();

  const assignableUsers = ["John Doe", "Jane Smith", "Team Alpha", "Team Beta"];
  const statuses = ["Not Started", "In Progress", "Completed", "On Hold"];

  const handleAddProject = () => {
    if (validateProjectForm()) {
      setProjects((prevProjects) => [
        ...prevProjects,
        { ...newProject, id: Date.now() },
      ]);
      navigate("/");
    } else {
      alert("Please fill out all mandatory fields!");
    }
  };

  const validateProjectForm = () => {
    // Basic validation for project details
    const basicValidation =
      newProject.projectName &&
      newProject.type &&
      newProject.description &&
      newProject.category &&
      newProject.techStack;

    // Validate additional details
    const additionalDetailsValidation = additionalDetails.every(detail =>
      detail.assignedTo && detail.status
    );

    return basicValidation && additionalDetailsValidation;
  };

  const handleFileChange = (index, field, e) => {
    const updatedDetails = [...additionalDetails];
    updatedDetails[index][field] = e.target.files[0];
    setAdditionalDetails(updatedDetails);
    setNewProject(prev => ({
      ...prev,
      additionalDetails: updatedDetails
    }));
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...additionalDetails];
    updatedDetails[index][field] = value;
    setAdditionalDetails(updatedDetails);
    setNewProject(prev => ({
      ...prev,
      additionalDetails: updatedDetails
    }));
  };

  const addAdditionalDetailSet = () => {
    setAdditionalDetails([
      ...additionalDetails,
      {
        projectDocument: null,
        nda: null,
        msa: null,
        assignedTo: "",
        status: "",
        createdDate: new Date().toISOString().split("T")[0],
      }
    ]);
  };

  const removeAdditionalDetailSet = (indexToRemove) => {
    if (additionalDetails.length > 1) {
      const updatedDetails = additionalDetails.filter((_, index) => index !== indexToRemove);
      setAdditionalDetails(updatedDetails);
      setNewProject(prev => ({
        ...prev,
        additionalDetails: updatedDetails
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex justify-center items-center mt-24">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-7xl w-full space-y-6 ">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center w-full">
          Add New Project
        </h1>


        <form className="space-y-6">
          {/* Section 1: Project Details */}
          <section className="border-2 border-blue-300 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Project Details
            </h2>
            <div className="grid grid-cols-3 gap-6">
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
                <div key={field} className={type === "textarea" ? "col-span-3" : ""}>
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

          {/* Section 2: Financial Details */}
          <section className="border-2 border-blue-300 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Financial Details
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Quoted Value", field: "quotedValue", type: "number" },
                { label: "Approved Value", field: "approvedValue", type: "number" },
                { label: "Final Quotation", field: "finalQuotation", type: "number" },
                { label: "Tax Terms", field: "taxTerms", type: "textarea" },
                { label: "Payment Terms", field: "paymentTerms", type: "textarea" },
              ].map(({ label, field, type }) => (
                <div key={field} className={type === "textarea" ? "col-span-3" : ""}>
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

          {/* Section 3: Additional Details */}
          <section className="border-2 border-blue-300 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Additional Details
            </h2>

            {additionalDetails.map((detail, index) => (
              <div
                key={index}
                className=" rounded-lg p-6 mb-4 relative"
              >
                {additionalDetails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAdditionalDetailSet(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                  >
                    <X />
                  </button>
                )}

                <div className="grid grid-cols-3 gap-6">
                  {/* Project Document Uploads */}
                  {[
                    { label: "Project Document", field: "projectDocument" },
                    { label: "NDA Document", field: "nda" },
                    { label: "MSA Document", field: "msa" }
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <label className="block text-gray-600 mb-1 font-medium">
                        {label}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, field, e)}
                        className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ))}

                  {/* Assign To Dropdown */}
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Assign To</label>
                    <select
                      value={detail.assignedTo}
                      onChange={(e) =>
                        handleDetailChange(index, 'assignedTo', e.target.value)
                      }
                      className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select an assignee</option>
                      {assignableUsers.map((user, userIndex) => (
                        <option key={userIndex} value={user}>{user}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Status</label>
                    <select
                      value={detail.status}
                      onChange={(e) =>
                        handleDetailChange(index, 'status', e.target.value)
                      }
                      className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select a status</option>
                      {statuses.map((status, statusIndex) => (
                        <option key={statusIndex} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Created Date */}
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Created Date</label>
                    <input
                      type="date"
                      value={detail.createdDate}
                      onChange={(e) =>
                        handleDetailChange(index, 'createdDate', e.target.value)
                      }
                      className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Button at the bottom */}
            <div className="flex justify-start mt-4">
              <button
                type="button"
                onClick={addAdditionalDetailSet}
                className="flex items-center text-blue-500 hover:text-blue-600 bg-blue-100 px-4 py-2 rounded-lg"
              >
                <Plus className="mr-2" /> Add More Details
              </button>
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