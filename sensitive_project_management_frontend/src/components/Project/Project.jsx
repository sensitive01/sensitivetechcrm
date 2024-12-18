// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const ProjectManager = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // const fetchProjects = async () => {
// //     //   try {
// //     //     const response = await fetch("http://localhost:3000/project/getallprojects");
// //     //     const data = await response.json();
// //     //     console.log("Fetched projects:", data); // Debugging log
// //     //     setProjects(data);
// //     //   } catch (err) {
// //     //     console.error("Error fetching projects:", err);
// //     //   }
// //     // };
// //     const fetchProjects = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:3000/project/getallprojects");
// //         console.log(response);
// //         setProjects(response.data);


// //       } catch (err) {
// //         setError('Failed to load Project data');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProjects();
// //   }, []);


// //   // const removeProject = async (id) => {
// //   //   console.log("Deleting project with ID:", id); // Debugging log
// //   //   if (!id) {
// //   //     alert("Invalid project ID");
// //   //     return;
// //   //   }

// //   //   try {
// //   //     const response = await fetch(`http://localhost:3000/project/deleteproject/${id}`, {
// //   //       method: "DELETE",
// //   //     });
// //   //     if (response.ok) {
// //   //       setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
// //   //     } else {
// //   //       alert("Failed to delete project");
// //   //     }
// //   //   } catch (err) {
// //   //     console.error("Error deleting project:", err);
// //   //     alert("An error occurred while deleting the project");
// //   //   }
// //   // };


// //   const removeProject = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this project?')) {
// //       try {
// //         const response = await axios.delete(`http://localhost:3000/project/deleteproject/${id}`);


// //         if (response.status === 200) {
// //           setProjects(projects.filter((project) => project._id !== id));
// //         }
// //       } catch (err) {
// //         setError('Failed to delete client');
// //       }
// //     }
// //   };


// //   // Open the modal with project details
// //   const [selectedProject, setSelectedProject] = useState(null);
// //   const openProjectDetails = (project) => setSelectedProject(project);
// //   const closeModal = () => setSelectedProject(null);

// //   return (
// //     <div className="bg-gray-50 p-6 min-h-screen mt-20">
// //       <h1 className="text-3xl font-bold text-gray-800 mb-6">Project Manager</h1>

// //       {/* Add Project Button */}
// //       <Link
// //         to="/add-project"
// //         className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-200"
// //       >
// //         Add Project
// //       </Link>

// //       {/* Data Table */}
// //       <div className="mt-8">
// //         <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>

// //         {loading ? (
// //           <p className="text-gray-500 text-lg">Loading projects...</p>
// //         ) : error ? (
// //           <p className="text-red-500 text-lg">Error: {error}</p>
// //         ) : projects.length > 0 ? (
// //           <div className="overflow-x-auto bg-white shadow-md rounded-lg">
// //             <table className="table-auto w-full border-collapse border border-gray-300">
// //               <thead className="bg-blue-500 text-white">
// //                 <tr>
// //                   <th className="px-4 py-2 border border-gray-300">Project Name</th>
// //                   <th className="px-4 py-2 border border-gray-300">Tech Stack</th>
// //                   <th className="px-4 py-2 border border-gray-300">Client Company</th>
// //                   <th className="px-4 py-2 border border-gray-300">Assigned To</th>
// //                   <th className="px-4 py-2 border border-gray-300">Duration</th>
// //                   <th className="px-4 py-2 border border-gray-300">Tasks</th>
// //                   <th className="px-4 py-2 border border-gray-300">Status</th>
// //                   <th className="px-4 py-2 border border-gray-300">Created Date</th>
// //                   <th className="px-4 py-2 border border-gray-300">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {projects.map((project) => (
// //                   <tr key={project._id} className="hover:bg-gray-100">
// //                     <td className="px-4 py-2 border border-gray-300">{project.projectName}</td>
// //                     <td className="px-4 py-2 border border-gray-300">{project.techStack}</td>
// //                     <td className="px-4 py-2 border border-gray-300">{project.clientCompany}</td>
// //                     <td className="px-4 py-2 border border-gray-300">{project.assignedTo}</td>
// //                     <td className="px-4 py-2 border border-gray-300">{project.duration}</td>
// //                     <td className="px-4 py-2 border border-gray-300">{project.tasks}</td>
// //                     <td className="px-4 py-2 border border-gray-300">{project.status}</td>
// //                     <td className="px-4 py-2 border border-gray-300">{new Date(project.createdDate).toLocaleDateString()}</td>
// //                     <td className="px-4 py-2 border border-gray-300 flex space-x-2">
// //                       <button
// //                         onClick={() => openProjectDetails(project)}
// //                         className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200"
// //                       >
// //                         View
// //                       </button>
// //                       <button
// //                         onClick={() => removeProject(project._id)}
// //                         className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200"
// //                       >
// //                         Remove
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>

// //             </table>
// //           </div>
// //         ) : (
// //           <p className="text-gray-500 text-lg">
// //             No projects added yet. Click "Add Project" to get started.
// //           </p>
// //         )}
// //       </div>

// //       {/* Modal for Project Details */}
// //       {selectedProject && (
// //         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
// //           <div className="bg-white p-8 rounded-lg max-w-lg w-full">
// //             <h2 className="text-2xl font-semibold text-gray-800">{selectedProject.projectName}</h2>
// //             <p className="text-sm text-gray-600 mt-4">{selectedProject.tasks}</p>
// //             <div className="mt-4">
// //               <p className="text-sm text-gray-500">Tech Stack: {selectedProject.techStack}</p>
// //               <p className="text-sm text-gray-500">Client Company: {selectedProject.clientCompany}</p>
// //               <p className="text-sm text-gray-500">Assigned To: {selectedProject.assignedTo}</p>
// //               <p className="text-sm text-gray-500">Duration: {selectedProject.duration}</p>
// //               <p className="text-sm text-gray-500">Status: {selectedProject.status}</p>
// //               <p className="text-sm text-gray-500">Created Date: {selectedProject.createdDate}</p>
// //             </div>
// //             <div className="mt-6 flex justify-end space-x-4">
// //               <button
// //                 onClick={closeModal}
// //                 className="bg-gray-400 text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-500 transition duration-200"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProjectManager;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const ProjectManager = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/project/getallprojects");
//         setProjects(response.data);
//       } catch (err) {
//         setError('Failed to load project data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const removeProject = async (id) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       try {
//         const response = await axios.delete(`http://localhost:3000/project/deleteproject/${id}`);
//         if (response.status === 200) {
//           setProjects(projects.filter((project) => project._id !== id));
//         }
//       } catch (err) {
//         setError('Failed to delete project');
//       }
//     }
//   };

//   // Open the modal with project details
//   const [selectedProject, setSelectedProject] = useState(null);
//   const openProjectDetails = (project) => setSelectedProject(project);
//   const closeModal = () => setSelectedProject(null);

//   return (
//     <div className="bg-gray-50 p-6 min-h-screen mt-20">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Project Manager</h1>

//       {/* Add Project Button */}
//       <Link
//         to="/add-project"
//         className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-200"
//       >
//         Add Project
//       </Link>

//       {/* Data Table */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>

//         {loading ? (
//           <p className="text-gray-500 text-lg">Loading projects...</p>
//         ) : error ? (
//           <p className="text-red-500 text-lg">Error: {error}</p>
//         ) : projects.length > 0 ? (
//           <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//             <table className="table-auto w-full border-collapse border border-gray-300">
//               <thead className="bg-blue-500 text-white">
//                 <tr>
//                   <th className="px-4 py-2 border border-gray-300">Project Name</th>
//                   <th className="px-4 py-2 border border-gray-300">Tech Stack</th>
//                   <th className="px-4 py-2 border border-gray-300">Client Company</th>
//                   <th className="px-4 py-2 border border-gray-300">Assigned To</th>
//                   <th className="px-4 py-2 border border-gray-300">Duration</th>
//                   <th className="px-4 py-2 border border-gray-300">Tasks</th>
//                   <th className="px-4 py-2 border border-gray-300">Status</th>
//                   <th className="px-4 py-2 border border-gray-300">Created Date</th>
//                   <th className="px-4 py-2 border border-gray-300">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {projects.map((project) => (
//                   <tr key={project._id} className="hover:bg-gray-100">
//                     <td className="px-4 py-2 border border-gray-300">{project.projectName}</td>
//                     <td className="px-4 py-2 border border-gray-300">{project.techStack}</td>
//                     <td className="px-4 py-2 border border-gray-300">{project.clientCompany}</td>
//                     <td className="px-4 py-2 border border-gray-300">{project.assignedTo}</td>
//                     <td className="px-4 py-2 border border-gray-300">{project.duration}</td>
//                     <td className="px-4 py-2 border border-gray-300">{project.tasks}</td>
//                     <td className="px-4 py-2 border border-gray-300">{project.status}</td>
//                     <td className="px-4 py-2 border border-gray-300">{new Date(project.createdDate).toLocaleDateString()}</td>
//                     <td className="px-4 py-2 border border-gray-300 flex space-x-2">
//                       <button
//                         onClick={() => openProjectDetails(project)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => removeProject(project._id)}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200"
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-500 text-lg">
//             No projects added yet. Click "Add Project" to get started.
//           </p>
//         )}
//       </div>

//       {/* Modal for Project Details */}
//       {selectedProject && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg max-w-lg w-full">
//             <h2 className="text-2xl font-semibold text-gray-800">{selectedProject.projectName}</h2>
//             <p className="text-sm text-gray-600 mt-4">{selectedProject.tasks}</p>
//             <div className="mt-4">
//               <p className="text-sm text-gray-500">Tech Stack: {selectedProject.techStack}</p>
//               <p className="text-sm text-gray-500">Client Company: {selectedProject.clientCompany}</p>
//               <p className="text-sm text-gray-500">Assigned To: {selectedProject.assignedTo}</p>
//               <p className="text-sm text-gray-500">Duration: {selectedProject.duration}</p>
//               <p className="text-sm text-gray-500">Status: {selectedProject.status}</p>
//               <p className="text-sm text-gray-500">Created Date: {selectedProject.createdDate}</p>
//             </div>
//             <div className="mt-6 flex justify-end space-x-4">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-400 text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-500 transition duration-200"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectManager;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // Store selected project for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/project/getallprojects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data); // Assuming API returns an array of projects
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
  }, []);

  const handleView = (project) => {
    setSelectedProject(project); // Set selected project for modal
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProject(null); // Clear selected project
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:3000/project/deleteproject/${projectId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted project from the state
        setProjects(projects.filter(project => project._id !== projectId));
        alert("Project deleted successfully");
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddProject = () => {
    navigate("/add-project"); // Navigate to the /add-project route
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center mt-28">Project List</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddProject}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
        >
          <span className="mr-2">+</span> Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-lg text-center">Loading projects...</p>
      ) : error ? (
        <p className="text-red-500 text-lg text-center">{error}</p>
      ) : projects.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Project Name</th>
                <th className="px-4 py-2 border border-gray-300">Tech Stack</th>
                <th className="px-4 py-2 border border-gray-300">Client Company</th>
                <th className="px-4 py-2 border border-gray-300">Assigned To</th>
                <th className="px-4 py-2 border border-gray-300">Duration</th>
                <th className="px-4 py-2 border border-gray-300">Tasks</th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300">Created Date</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{project.projectDetails[0]?.projectName}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.projectDetails[0]?.techStack}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.clientCompany}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.additionalDetails[0]?.assignedTo}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.projectDetails[0]?.duration}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.tasks}</td>
                  <td className="px-4 py-2 border border-gray-300">{project.additionalDetails[0]?.status}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(project.additionalDetails[0]?.createdDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleView(project)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">No projects available.</p>
      )}

      {/* Modal for Viewing Project */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Details</h2>
            <div>
              <p><strong>Project Name:</strong> {selectedProject.projectDetails[0]?.projectName}</p>
              <p><strong>Tech Stack:</strong> {selectedProject.projectDetails[0]?.techStack}</p>
              <p><strong>Client Company:</strong> {selectedProject.clientCompany}</p>
              <p><strong>Assigned To:</strong> {selectedProject.additionalDetails[0]?.assignedTo}</p>
              <p><strong>Duration:</strong> {selectedProject.projectDetails[0]?.duration}</p>
              <p><strong>Tasks:</strong> {selectedProject.tasks}</p>
              <p><strong>Status:</strong> {selectedProject.additionalDetails[0]?.status}</p>
              <p><strong>Created Date:</strong> {new Date(selectedProject.additionalDetails[0]?.createdDate).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
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
