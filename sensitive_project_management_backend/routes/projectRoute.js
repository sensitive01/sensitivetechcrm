const express = require("express");
const projectRouter = express.Router();
const projectController = require("../controllers/projectController");

projectRouter.post("/createproject", projectController.createProject);
projectRouter.get("/getallprojects", projectController.getAllProjects);
projectRouter.get("/getprojectbyid/:id", projectController.getProjectById);
projectRouter.put("/updateprojectby/:id", projectController.updateProjectById);
projectRouter.delete("/deleteproject/:id", projectController.deleteProjectById);

module.exports = projectRouter;