const mongoose = require('mongoose');

// Define the schema for the task
const taskSchema = new mongoose.Schema({
  project: {
    type: String,
   
  },
  task: {
    type: String,
 
  },
  empId: {
    type: String,
   
  },
  description: {
    type: String,
 
  },
  timeline: {
    type: String,  
  },
  status: {
    type: String,
   
  },
  date: {
    type: Date,
    default: Date.now,  
  },
  attachments:[{
    type:String
}]
});

const Task = mongoose.model('Task', taskSchema);


module.exports = Task;
