import React, { useEffect, useState, useMemo } from "react";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deletetheProject } from "../../api/services/projectServices";

const ProjectDetailsModal = ({ project, onClose, onEdit }) => {
  const renderArrayData = (array, field) => {
    if (!array || !Array.isArray(array) || array.length === 0) return "N/A";
    return array.map((item, index) => item[field]).filter(Boolean).join(", ");
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Details</h2>

        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">Project Information:</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Project Name:</strong> {renderArrayData(project.projectDetails, 'projectName')}</p>
              <p><strong>Tech Stack:</strong> {renderArrayData(project.projectDetails, 'techStack')}</p>
              <p><strong>Type:</strong> {renderArrayData(project.projectDetails, 'type')}</p>
              <p><strong>Category:</strong> {renderArrayData(project.projectDetails, 'category')}</p>
              <p><strong>Domain:</strong> {renderArrayData(project.projectDetails, 'domain')}</p>
              <p><strong>Requirements:</strong> {renderArrayData(project.projectDetails, 'requirements')}</p>
              <p><strong>Description:</strong> {renderArrayData(project.projectDetails, 'description')}</p>
              <p><strong>Designation:</strong> {renderArrayData(project.projectDetails, 'designation')}</p>
              <p><strong>AddOnServices:</strong> {renderArrayData(project.projectDetails, 'addOnServices')}</p>
              <p><strong>Duration:</strong> {renderArrayData(project.projectDetails, 'duration')}</p>
              <p><strong>Dependencies:</strong> {renderArrayData(project.projectDetails, 'dependencies')}</p>
              <p><strong>CompanyName:</strong> {renderArrayData(project.projectDetails, 'companyName')}</p>
              <p><strong>Task:</strong> {renderArrayData(project.projectDetails, 'task')}</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Financial Details:</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Quoted Value:</strong> {renderArrayData(project.financialDetails, 'quotedValue')}</p>
              <p><strong>Approved Value:</strong> {renderArrayData(project.financialDetails, 'approvedValue')}</p>
              <p><strong>Payment Terms:</strong> {renderArrayData(project.financialDetails, 'paymentTerms')}</p>
              <p><strong>FinalQuotation:</strong> {renderArrayData(project.financialDetails, 'finalQuotation')}</p>
              <p><strong>Tax Terms:</strong> {renderArrayData(project.financialDetails, 'taxTerms')}</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Additional Information:</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>ProjectDocument:</strong> {renderArrayData(project.additionalDetails, 'projectDocument')}</p>
              <p><strong>Assigned To:</strong> {renderArrayData(project.additionalDetails, 'assignedTo')}</p>
              <p><strong>Status:</strong> {renderArrayData(project.additionalDetails, 'status')}</p>
              <p><strong>NDA:</strong> {renderArrayData(project.additionalDetails, 'nda')}</p>
              <p><strong>MSA:</strong> {renderArrayData(project.additionalDetails, 'msa')}</p>
              <p><strong>Created Date:</strong> {
                project.additionalDetails?.[0]?.createdDate
                  ? new Date(project.additionalDetails[0].createdDate).toLocaleDateString()
                  : "N/A"
              }</p>
            </div>
          </section>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => onEdit(project)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const ITEMS_PER_PAGE = 5;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || "Superadmin");
  const _id = localStorage.getItem("empId");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`https://sensitivetechcrm.onrender.com/project/getallprojects/${_id}`);
        const data = await response.json(); // Ensure you're getting the correct data
        if (response.status === 200) {
          setProjects(data); // Set the projects from the response data
        } else {
          throw new Error("Failed to fetch projects");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchProjects();
  }, [_id]);

  // Helper function to get the latest or most relevant value from an array of objects
  const getLatestValue = (array, field) => {
    if (!array || !Array.isArray(array) || array.length === 0) return "N/A";
    const uniqueValues = [...new Set(array.map(item => item[field]).filter(Boolean))];
    return uniqueValues.join(", ") || "N/A";
  };

  const processedProjects = useMemo(() => {
    return projects?.map(project => ({
      ...project,
      displayData: {
        projectName: getLatestValue(project.projectDetails, 'projectName'),
        techStack: getLatestValue(project.projectDetails, 'techStack'),
        companyName: getLatestValue(project.projectDetails, 'companyName'),
        assignedTo: getLatestValue(project.additionalDetails, 'assignedTo'),
        duration: getLatestValue(project.projectDetails, 'duration'),
        task: getLatestValue(project.projectDetails, 'task'),
        status: getLatestValue(project.additionalDetails, 'status'),
        createdDate: project.additionalDetails?.[0]?.createdDate
          ? new Date(project.additionalDetails[0].createdDate).toLocaleDateString()
          : "N/A"
      }
    }))
    .filter(project => 
      role === "Superadmin" || project.displayData.status.toLowerCase() === "pending"
    );
  }, [projects, role]);
  
  

  const handleAddProject = () => {
    window.location.href = '/add-project';
  };

  const handleDelete = async (projectId) => {
    if (!projectId) {
      alert("Invalid project ID. Unable to delete.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await deletetheProject(projectId);

        if (response?.status === 200) {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project._id !== projectId)
          );
          alert("Project deleted successfully!");
        } else {
          alert("Failed to delete project. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert(
          error.response?.data?.message ||
          "An error occurred while deleting the project."
        );
      }
    }
  };


  const handleExportData = () => {
    const csvRows = [];
    const headers = [
      "Project Name",
      "Tech Stack",
      "Client Company",
      "Assigned To",
      "Duration",
      "Tasks",
      "Status",
      "Created Date",
    ];
    csvRows.push(headers.join(","));

    processedProjects.forEach((project) => {
      const row = [
        project.displayData.projectName,
        project.displayData.techStack,
        project.displayData.companyName,
        project.displayData.assignedTo,
        project.displayData.duration,
        project.displayData.task,
        project.displayData.status,
        project.displayData.createdDate,
      ];
      csvRows.push(row.map((value) => `"${value}"`).join(","));
    });

    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "projects.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const applyDateFilter = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    // Convert dates to Date objects for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredProjects = projects.filter((project) => {
      const projectDate = new Date(project.additionalDetails?.[0]?.createdDate); // Or another date property
      return projectDate >= start && projectDate <= end;
    });

    setProjects(filteredProjects); // Update the projects state with the filtered results
  };


  const handleView = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleEdit = (project) => {
    navigate(`/edit-project/${project._id}`);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...processedProjects];

    if (searchTerm) {
      filtered = filtered.filter((project) => {
        const searchString = searchTerm.toLowerCase();
        return (
          project.displayData.projectName.toLowerCase().includes(searchString) ||
          project.displayData.techStack.toLowerCase().includes(searchString) ||
          project.displayData.companyName.toLowerCase().includes(searchString) ||
          project.displayData.assignedTo.toLowerCase().includes(searchString)
        );
      });
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a.displayData[sortConfig.key] || '';
        const bValue = b.displayData[sortConfig.key] || '';

        if (sortConfig.key === 'createdDate') {
          return sortConfig.direction === 'asc'
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return filtered;
  }, [processedProjects, searchTerm, sortConfig]);

  const paginatedProjects = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return filteredAndSortedProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProjects, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedProjects.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center mt-28">Project List</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border border-blue-500 rounded w-64">
          <span className="px-2 text-gray-500">
            <Filter className="h-5 w-5" />
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="p-2 rounded w-full outline-none"
          />
        </div>

        <div className="flex space-x-4 items-center -mt-6">
          {role === "Superadmin" && (
            <>
              <div>
                <label htmlFor="startDate" className="block">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                 
                  className="border border-blue-500 p-2 rounded w-32"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                 
                  className="border border-blue-500 p-2 rounded w-32"
                />
              </div>
              <button
                onClick={applyDateFilter}
                className="bg-blue-500 text-white px-6 py-2 rounded h-10 w-auto text-sm mt-6"
              >
                Apply Filter
              </button>
            </>
          )}
        </div>

        <div className="flex justify-end items-center space-x-4 mb-4">
          {role === "Superadmin" && (
            <button
              onClick={handleExportData}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
            >
              Export Data
            </button>
          )}
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
          >
            <span className="mr-2">+</span> Add Project
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-lg text-center">Loading projects...</p>
      ) : error ? (
        <p className="text-red-500 text-lg text-center">{error}</p>
      ) : paginatedProjects.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full">
            <thead className="bg-[#2563eb] text-white border-b">
              <tr>
                <th className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('projectName')}>
                  Project Name
                </th>
                <th className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('techStack')}>
                  Tech Stack
                </th>
                <th className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('companyName')}>
                  Client Company
                </th>
                <th className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('assignedTo')}>
                  Assigned To
                </th>
                <th className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('duration')}>
                  Duration
                </th>
                <th className="px-4 py-2 border border-gray-300">Tasks</th>
                <th className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('status')}>
                  Status
                </th>
                <th className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('createdDate')}>
                  Created Date
                </th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.projectName}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.techStack}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.companyName}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.assignedTo}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.duration}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.task}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.status}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.displayData.createdDate}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(project)}
                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">No projects found.</p>
      )}

      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          <ChevronLeft className="h-5 w-5 inline" />
          Previous
        </button>
        <p className="text-gray-700">
          Page {currentPage + 1} of {totalPages}
        </p>
        <button
          disabled={currentPage + 1 === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          className={`px-4 py-2 rounded ${currentPage + 1 === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          Next
          <ChevronRight className="h-5 w-5 inline" />
        </button>
      </div>

      {isModalOpen && selectedProject && (
        <ProjectDetailsModal project={selectedProject} onClose={handleCloseModal} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default ProjectManager;
