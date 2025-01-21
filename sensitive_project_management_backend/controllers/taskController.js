// const express = require("express");
const Task = require("../models/taskSchema"); // Import the Task model
// const multer = require("multer");

// const app = express();

// const upload = multer({ dest: "uploads/" }); 

// Controller for creating a new task
const createTask = async (req, res) => {
    try {
     
        const { project, task, empId, description, timeline, status, date } = req.body;
        console.log("req.body",req.body)
        // Check if there are files and if req.files is defined
        // let attachments = [];
        // if (req.files && req.files.length > 0) {
        //     attachments = req.files.map((file) => file.path); // Save file paths or other file info
        // }

        // Create a new task object with all the data
        const newTask = new Task({
            project,
            task,
            empId,
            description,
            timeline,
            status,
            date,
            // attachments, // Attach file paths or the file data itself
        });

        // Save the new task to the database
        const savedTask = await newTask.save();

        // Return a success response with the full task object
        return res.status(201).json({
            message: 'Task created successfully',
            task: savedTask, // Ensure the full task object is returned here
        });
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({
            message: 'Error creating task',
            error: error.message,
        });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); 
    return res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message,
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  console.log("Edit task==>")
  const { id } = req.params;

  try {
    const task = await Task.findById(id); // Find a task by its ID
    console.log("task",task)
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving task",
      error: error.message,
    });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  console.log("Update task",req.body)
  const { id } = req.params;
  const { project, task, empId, description, timeline, status, attachments } =
    req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { project, task, empId, description, timeline, status, attachments },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

// Update the status of a task by ID
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status }, // Only update the status field
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating task status",
      error: error.message,
    });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id); // Delete a task by ID
    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

// Get total tasks count
const getTotalTasks = async (req, res) => {
  try {
    // Count the total number of tasks
    const totalTasks = await Task.countDocuments();

    console.log("Total tasks count:", totalTasks);

    // Return the total tasks count as a response
    res.status(200).json({ TotalTasks: totalTasks });
  } catch (error) {
    console.error("Error fetching total tasks:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateTaskStatus, 
  deleteTask,
  getTotalTasks,
};
