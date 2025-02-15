require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require('cors')

const app = express();
app.use(express.json());

// middleware

app.use(cors())
app.use(express.json())

// Routes ---- */

// login / registration routes
app.use('/auth', authRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
