const express = require("express");
const projectRouter = express.Router();
const projectController = require("../controllers/projectController");

projectRouter.post("/createproject", projectController.createProject);
projectRouter.get("/getallprojects", projectController.getAllProjects);
projectRouter.get("/getprojectbyid/:id", projectController.getProjectById);
projectRouter.put("/updateprojectby/:id", projectController.updateProjectById);
projectRouter.delete("/deleteproject/:id", projectController.deleteProjectById);
projectRouter.get("/projectname", projectController.getProjectNames);
// Route to get total projects count
projectRouter.get('/totalprojects', projectController.getTotalProjects);


module.exports = projectRouter;

