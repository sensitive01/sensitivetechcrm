const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Assuming your MongoDB connection is here
const cors = require('cors');
const adminRoute =require('./routes/adminRoute')
const projectRouter = require('./routes/projectRoute')
const taskRouter = require('./routes/taskRoute')
const verificationRoutes = require("./routes/verificationRoutes")
// const EmployeeRoutes = require("./routes/EmployeeRoutes");


const clientRoutes = require('./routes/clientRoutes')
const leaveRoutes = require('./routes/leaveRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const superadminRouter = require('./routes/superadminRoutes');
const leadRoutes = require('./routes/leadRoute');
const payrollRoutes = require('./routes/payrollRoute');
const updateLogRoutes = require('./routes/updatelogRoute');


dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/', attendanceRoutes);
app.use('/clients', clientRoutes);
app.use('/leaves', leaveRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/leads', leadRoutes);
app.use('/payroll',payrollRoutes);
app.use('/updatelog',updateLogRoutes);

// Connect to database
db(); // MongoDB connection setup

// Use the login routes
app.use('/', adminRoute);
app.use('/project', projectRouter)
app.use('/task', taskRouter)
app.use('/employee-login',verificationRoutes);
app.use('/super-admin', superadminRouter)
app.use('/admin-login',verificationRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
