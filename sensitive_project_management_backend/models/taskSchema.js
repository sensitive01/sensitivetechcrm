const mongoose = require('mongoose');

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
  attachments:[],
});


module.exports = mongoose.model('Task', taskSchema);
