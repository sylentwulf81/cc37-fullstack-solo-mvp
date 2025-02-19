require("dotenv").config();
console.log("Environment Variables Loaded:");
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);

const express = require("express");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes ---- */

// login / registration routes
app.use("/auth", authRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
