const express = require("express");
const employeeRouter = express.Router();
// const { login } = require("../controllers/LoginController");
const Employee = require("../controllers/employeeController")


// employeeRouter.post("/login", login);


employeeRouter.post("/createemployee", Employee.createEmployee)
employeeRouter.get("/getallemployees", Employee.getAllEmployees)
employeeRouter.get("/getallemployeesbyid/:id", Employee.getEmployeeById)
employeeRouter.patch("/updateemployee/:id", Employee.updateEmployee)
employeeRouter.delete("/deleteemployee/:id", Employee.deleteEmployee)

module.exports = employeeRouter;
