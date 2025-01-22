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
employeeRouter.get("/getemployeesbyid/:id", Employee.getEmployeeById)
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
employeeRouter.get("/totalemployee", Employee.getTotalEmployees);

employeeRouter.get("/getaddressbypincode/:pincode", async (req, res) => {
  const { pincode } = req.params;

  try {
    const addressDetails = await Employee.fetchAddressDetailsByPincode(pincode);
    if (addressDetails) {
      return res.status(200).json({ success: true, address: addressDetails });
    } else {
      return res.status(404).json({ success: false, message: "Address details not found." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = employeeRouter;
