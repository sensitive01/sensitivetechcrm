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
  try {
    const project = await Project.findById(id);
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

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};

