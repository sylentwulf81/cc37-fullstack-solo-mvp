// Set NODE_ENV if not already set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

console.log(`Running in ${process.env.NODE_ENV} mode`);
console.log("Environment Variables Loaded:");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ [Set]" : "✗ [Not Set]");
console.log("DB_USER:", process.env.DB_USER ? "✓ [Set]" : "✗ [Not Set]");
console.log("DB_HOST:", process.env.DB_HOST ? "✓ [Set]" : "✗ [Not Set]");
console.log("DB_NAME:", process.env.DB_NAME ? "✓ [Set]" : "✗ [Not Set]");
console.log("DB_PORT:", process.env.DB_PORT ? "✓ [Set]" : "✗ [Not Set]");
console.log(
  "Attempting to connect to database:",
  process.env.DB_NAME || "script_hero"
);

const express = require("express");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db"); // Import the database module

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
