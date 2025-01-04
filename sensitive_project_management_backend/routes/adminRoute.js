const express = require("express");
const multer = require("multer");
const employeeRouter = express.Router();
// const { login } = require("../controllers/LoginController");
const Employee = require("../controllers/employeeController")


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// employeeRouter.post("/login", login);


// employeeRouter.post("/createemployee", Employee.createEmployee)
employeeRouter.post(
    "/createemployee",
    upload.fields([
      { name: "profileImage", maxCount: 1 },
      { name: "addressProofFile", maxCount: 1 },
      { name: "idProofFile", maxCount: 1 },
      { name: "resume", maxCount: 1 }
    ]),
    Employee.createEmployee
  )
employeeRouter.get("/getallemployees", Employee.getAllEmployees)
employeeRouter.get("/getallemployeesbyid/:id", Employee.getEmployeeById)
// employeeRouter.patch("/updateemployee/:id", Employee.updateEmployee)
employeeRouter.patch(
    "/updateemployee/:id",
    upload.fields([
      { name: "profileImage", maxCount: 1 },
      { name: "addressProofFile", maxCount: 1 },
      { name: "idProofFile", maxCount: 1 },
      { name: "resume", maxCount: 1 }
    ]),
    Employee.updateEmployee
  );
employeeRouter.delete("/deleteemployee/:id", Employee.deleteEmployee)
employeeRouter.get("/employename",Employee.getEmployeeNames)
module.exports = employeeRouter;
