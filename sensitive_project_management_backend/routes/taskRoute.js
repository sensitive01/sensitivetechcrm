const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskController');

// Define routes
taskRouter.get('/getalltask', taskController.getAllTasks); // Get all tasks
taskRouter.get('/gettaskbyid/:id', taskController.getTaskById); // Get task by ID
taskRouter.put('/updatetask/:id', taskController.updateTask); // Update task
taskRouter.delete('/deletetask/:id', taskController.deleteTask); // Delete task
taskRouter.post('/createtask',taskController.createTask);
taskRouter.put('/update-status/:id',taskController.updateTaskStatus); 


module.exports = taskRouter;
