const Project = require("../models/pojectSchema");

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

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
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

