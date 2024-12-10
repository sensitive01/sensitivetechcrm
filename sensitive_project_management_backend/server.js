const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const db = require('./config/db')
const cors = require('cors')


dotenv.config();

const app = express();
const PORT = 3000;

db();
app.use(bodyparser.json());
app.use(cors());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });