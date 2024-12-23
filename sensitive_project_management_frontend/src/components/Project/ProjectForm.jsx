import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

const ProjectForm = () => {
  const navigate = useNavigate();

  const assignableUsers = ["John Doe", "Jane Smith", "Team Alpha", "Team Beta"];
  const statuses = ["Not Started", "In Progress", "Completed", "On Hold"];

  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState([
    {
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
      dependencies: "",
      companyName: "",
      task: "",
    },
  ]);

  const [financialDetails, setFinancialDetails] = useState([
    {
      quotedValue: "",
      approvedValue: "",
      paymentTerms: "",
      finalQuotation: "",
      taxTerms: "",
    },
  ]);

  const [additionalDetails, setAdditionalDetails] = useState([
    {
      projectDocument: null,
      nda: null,
      msa: null,
      assignedTo: "",
      status: "",
      createdDate: new Date().toISOString().split("T")[0],
    },
  ]);

  const handleAddProject = async () => {
    if (validateForm()) {
      const projectData = {
        projectDetails,
        financialDetails,
        additionalDetails,
      };

      console.log("projectData", projectData);

      try {
        const response = await fetch("http://localhost:3000/project/createproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        });
        if (response.ok) {
          const newProject = await response.json();
          console.log(newProject);
          setProjects((prevProjects) => [
            ...prevProjects,
            { id: Date.now(), ...newProject },
          ]);
          alert("Project added successfully!");
        } else {
          alert("Failed to create project. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating the project.");
      }
    } else {
      alert("Please fill out all mandatory fields!");
    }
  };

  const validateForm = () => {
    const projectValidation = projectDetails.every(
      (detail) =>
        detail.projectName &&
        detail.type &&
        detail.description &&
        detail.category &&
        detail.techStack &&
        detail.companyName &&
        detail.task
    );

    const financialValidation = financialDetails.every(
      (detail) => detail.quotedValue && detail.approvedValue && detail.paymentTerms
    );

    const additionalValidation = additionalDetails.every(
      (detail) => detail.assignedTo && detail.status
    );

    return projectValidation && financialValidation && additionalValidation;
  };

  const handleInputChange = (index, section, field, value) => {
    const sectionState =
      section === "projectDetails"
        ? projectDetails
        : section === "financialDetails"
        ? financialDetails
        : additionalDetails;

    const updatedDetails = [...sectionState];
    updatedDetails[index][field] = value;

    if (section === "projectDetails") setProjectDetails(updatedDetails);
    if (section === "financialDetails") setFinancialDetails(updatedDetails);
    if (section === "additionalDetails") setAdditionalDetails(updatedDetails);
  };

  const handleFileChange = (index, field, e) => {
    const updatedDetails = [...additionalDetails];
    updatedDetails[index][field] = e.target.files[0];
    setAdditionalDetails(updatedDetails);
  };

  const addSection = (section) => {
    const defaultValue =
      section === "projectDetails"
        ? {
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
            dependencies: "",
            companyName: "",
            task: "",
          }
        : section === "financialDetails"
        ? {
            quotedValue: "",
            approvedValue: "",
            paymentTerms: "",
            finalQuotation: "",
            taxTerms: "",
          }
        : {
            projectDocument: null,
            nda: null,
            msa: null,
            assignedTo: "",
            status: "",
            createdDate: new Date().toISOString().split("T")[0],
          };

    if (section === "projectDetails")
      setProjectDetails((prevDetails) => [...prevDetails, defaultValue]);
    if (section === "financialDetails")
      setFinancialDetails((prevDetails) => [...prevDetails, defaultValue]);
    if (section === "additionalDetails")
      setAdditionalDetails((prevDetails) => [...prevDetails, defaultValue]);
  };

  const removeSection = (section, index) => {
    const sectionState =
      section === "projectDetails"
        ? projectDetails
        : section === "financialDetails"
        ? financialDetails
        : additionalDetails;

    if (sectionState.length > 1) {
      const updatedDetails = sectionState.filter((_, i) => i !== index);

      if (section === "projectDetails") setProjectDetails(updatedDetails);
      if (section === "financialDetails") setFinancialDetails(updatedDetails);
      if (section === "additionalDetails") setAdditionalDetails(updatedDetails);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex justify-center items-center mt-24">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-7xl w-full space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center w-full">
          Add New Project
        </h1>

        <form className="space-y-6">
          {[["Project Details", projectDetails, "projectDetails"], ["Financial Details", financialDetails, "financialDetails"], ["Additional Details", additionalDetails, "additionalDetails"]].map(([title, details, section]) => (
            <section key={section} className="border-2 border-blue-300 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>

              {details.map((detail, index) => (
                <div key={index} className="rounded-lg p-6 mb-4 relative">
                  {details.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(section, index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                    >
                      <X />
                    </button>
                  )}

                  <div className="grid grid-cols-3 gap-6">
                    {Object.keys(detail).map((field) => (
                      field !== "task" && (
                        <div key={field}>
                          <label className="block text-gray-600 mb-1 font-medium">
                            {field.replace(/([A-Z])/g, " $1")}
                          </label>
                          {field === "assignedTo" ? (
                            <select
                              value={detail[field]}
                              onChange={(e) =>
                                handleInputChange(index, section, field, e.target.value)
                              }
                              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                              <option value="">Select User</option>
                              {assignableUsers.map((user) => (
                                <option key={user} value={user}>
                                  {user}
                                </option>
                              ))}
                            </select>
                          ) : field === "status" ? (
                            <select
                              value={detail[field]}
                              onChange={(e) =>
                                handleInputChange(index, section, field, e.target.value)
                              }
                              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                              <option value="">Select Status</option>
                              {statuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          ) : field.includes("Document") ? (
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(index, field, e)}
                              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          ) : (
                            <input
                              type={field.includes("Date") ? "date" : "text"}
                              value={detail[field]}
                              onChange={(e) =>
                                handleInputChange(index, section, field, e.target.value)
                              }
                              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          )}
                        </div>
                      )
                    ))}
                  </div>

                  {/* Only render task field in Project Details section */}
                  {section === "projectDetails" && (
                    <div className="w-full mt-4">
                      <label className="block text-gray-600 mb-1 font-medium">
                        Task
                      </label>
                      <textarea
                        value={detail["task"]}
                        onChange={(e) =>
                          handleInputChange(index, section, "task", e.target.value)
                        }
                        className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                      />
                    </div>
                  )}

                </div>
              ))}

              <button
                type="button"
                onClick={() => addSection(section)}
                className="flex items-center text-blue-500 hover:text-blue-600 bg-blue-100 px-4 py-2 rounded-lg"
              >
                <Plus className="mr-2" /> Add More {title}
              </button>
            </section>
          ))}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/add-project")}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
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
