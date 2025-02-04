const Project = require("../models/pojectSchema");
const employeeSchema = require("../models/employeeSchema");

const createProject = async (req, res) => {
  try {
    const { projectDetails, financialDetails, additionalDetails } = req.body;
    console.log("Received Data:", req.body); // Log received data

    // Create a new project with the provided details
    const newProject = new Project({
      projectDetails,
      financialDetails,
      additionalDetails,
    });

    // Save the project to the database
    await newProject.save();

    res.status(201).json({ message: "Project created successfully", newProject });
  } catch (error) {
    console.error("Error creating project:", error); // Log the error
    res.status(500).json({ message: "Error creating project" });
  }
};

// const getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.status(200).json(projects);
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     res.status(500).json({ message: "Error fetching projects" });
//   }
// };


// const getAllProjects = async (req, res) => {
//   const { empId } = req.params;
//   console.log("Requested empId:", empId);  // Log the requested empId

//   try {
//     // Find the employee by empId
//     const employee = await employeeSchema.findOne({ empId });

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     console.log("Employee found:", employee);  // Log the employee data

//     // Fetch the projects assigned to the employee
//     const projects = await Project.find({ assignedTo: empId });  // Ensure assignedTo contains empId

//     console.log("Fetched Projects:", projects);  // Log the fetched projects

//     if (!projects.length) {
//       return res.status(404).json({ message: 'No projects found for this employee' });
//     }

//     // Send the project details as the response
//     res.status(200).json(projects);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const getAllProjects = async (req, res) => {
  try {
    const { id } = req.params;  // Get the user ID from the URL params
    console.log("User  ID:", id);

    // Fetch employee details using the user ID
    const empdata = await employeeSchema.findOne({ _id: id }, { role: 1, empId: 1, name: 1 });
    
    // Check if employee data was found
    if (!empdata) {
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Employee Data:", empdata);

    let projects;

    // Check if the user is an admin (can see all projects)
    if (id === "6779360b3fb6809073b96ef4") {
      // Admin: Fetch all projects
      projects = await Project.find();
    } else {
      // Non-admin: Fetch only projects assigned to the employee by name
      projects = await Project.find({
        "additionalDetails.assignedTo": empdata.name // Match projects where assignedTo contains the employee's name
      });
    }

    console.log("Projects:", projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};



// READ: Get project by ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  console.log("id ",id)
  try {
    // const project = await Project.findById(id);

    const project = await Project.findOne(
      { _id: id },
      {
        "projectDetails._id": 0,
        "financialDetails._id": 0,
        "additionalDetails._id": 0
      }
    ).lean();
    

    
    console.log(project);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ message: "Error fetching project" });
  }
};

// UPDATE: Update project by ID
const updateProjectById = async (req, res) => {
  const { id } = req.params;
  const { projectDetails, financialDetails, additionalDetails } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { projectDetails, financialDetails, additionalDetails },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project" });
  }
};

// DELETE: Delete project by ID
const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Error deleting project" });
  }
};

const getProjectNames = async(req,res) => {
  try {
    const projects = await Project.find({},{_id:1, "projectDetails.projectName":1})
    console.error("projects", projects);
  
    res.json(projects);
  } catch (error) {
    res.status(500).json({message: "Error Fetching projects"});
  }
};

// Get total projects count
const getTotalProjects = async (req, res) => {
  try {
    // Count the total number of projects
    const totalProjects = await Project.countDocuments();

    console.log("Total projects count:", totalProjects);

    // Return the total projects count as a response
    res.status(200).json({ TotalProjects: totalProjects });
  } catch (error) {
    console.error("Error fetching total projects:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectNames,
  getTotalProjects,
};

