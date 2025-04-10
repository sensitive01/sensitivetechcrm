const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');
// const fetch = require('node-fetch'); 
const adminRoute =require('./routes/adminRoute')
const projectRouter = require('./routes/projectRoute')
const taskRouter = require('./routes/taskRoute')
const verificationRoutes = require("./routes/verificationRoutes")
const clientRoutes = require('./routes/clientRoutes')
const leaveRoutes = require('./routes/leaveRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const superadminRouter = require('./routes/superadminRoutes');
const leadRoutes = require('./routes/leadRoute');
const payrollRoutes = require('./routes/payrollRoute');
const updateLogRoutes = require('./routes/updatelogRoute');
const paymentRoutes =  require('./routes/paymentRoute');
const expenseRoutes =  require('./routes/expenseRoute');
const momRoutes =  require('./routes/momRoute');
const quotationRoutes =  require('./routes/quotationRoute');
const placesRoutes = require('./routes/placesRoutes');

dotenv.config();

const app = express();
const PORT = 3000;

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
app.use('/payments', paymentRoutes);
app.use('/expense', expenseRoutes);
app.use('/mom', momRoutes);
app.use('/quotation', quotationRoutes);
app.use('/api', placesRoutes);

// app.get('/api/places', async (req, res) => {
//   const { location, radius, keyword, type } = req.query;
//   const apiKey = process.env.GOOGLE_API_KEY;

//   if (!location || !radius || (!keyword && !type)) {
//       return res.status(400).json({ error: 'Missing required parameters.' });
//   }

//   try {
//       const queryParam = keyword
//           ? `keyword=${encodeURIComponent(keyword)}`
//           : `type=${encodeURIComponent(type)}`;

//       const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&${queryParam}&key=${apiKey}`;

//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       res.json(data);
//   } catch (err) {
//       console.error("Google API fetch error:", err);
//       res.status(500).json({ error: 'Google Places API error' });
//   }
// });


db(); 
app.use('/', adminRoute);
app.use('/project', projectRouter)
app.use('/task', taskRouter)
app.use('/employee-login',verificationRoutes);
app.use('/super-admin', superadminRouter)
app.use('/admin-login',verificationRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
