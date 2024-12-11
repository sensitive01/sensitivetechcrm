const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Assuming your MongoDB connection is here
const cors = require('cors');
const adminRoute =require('./routes/adminRoute')
const projectRouter = require('./routes/projectRoute')
const taskRouter = require('./routes/taskRoute')
// const EmployeeRoutes = require("./routes/EmployeeRoutes");


const clientRoutes = require('./routes/clientRoutes')
const leaveRoutes = require('./routes/leaveRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')


dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/', attendanceRoutes);
app.use('/clients', clientRoutes);
app.use('/leaves', leaveRoutes);
app.use('/attendance', attendanceRoutes);


// Connect to database
db(); // MongoDB connection setup

// Use the login routes
app.use('/', adminRoute);
app.use('/project', projectRouter)
app.use('/task', taskRouter)
// app.use('/employees',adminRoute);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
