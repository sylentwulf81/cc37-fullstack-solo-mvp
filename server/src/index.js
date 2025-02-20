require("dotenv").config();
console.log("Environment Variables Loaded:");
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);

const express = require("express");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://scriptforge-cc37-solo-mvp.onrender.com"
        : "http://localhost:5173",
    credentials: true,
  })
);

// Routes ---- */

// login / registration routes
app.use("/auth", authRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
