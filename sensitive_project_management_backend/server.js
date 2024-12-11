const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const db = require('./config/db')
const cors = require('cors')


const clientRoutes = require('./routes/clientRoutes')
const leaveRoutes = require('./routes/leaveRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')


dotenv.config();

const app = express();
const PORT = 3000;

db();
app.use(bodyparser.json());
app.use(cors());

app.use('/', attendanceRoutes);
app.use('/clients', clientRoutes);
app.use('/leaves', leaveRoutes);
app.use('/attendance', attendanceRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });