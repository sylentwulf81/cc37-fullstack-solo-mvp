const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { knex } = require("../db");
const router = express.Router();

// ----- registration route ----- */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registration attempt for:", { username, email });

  try {
    // Check if user exists
    console.log("Checking if user exists...");
    const existingUser = await knex("users").where({ username }).first();
    if (existingUser) {
      console.log("User already exists:", username);
      return res.status(400).json({
        error: true,
        message: "User already exists!",
      });
    }

    // hash password using brcyptjs
    console.log("Hashing password...");
    const hashedPassword = await bcryptjs.hash(password, 10);

    // insert new user
    console.log("Inserting new user...");
    const [newUser] = await knex("users")
      .insert({
        username,
        email,
        password_hash: hashedPassword,
      })
      .returning(["id", "username"]);

    console.log("User created successfully:", newUser);
    res.status(201).json({
      message: "User created",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error details:");
    console.error("- Error name:", error.name);
    console.error("- Error message:", error.message);
    console.error("- Error code:", error.code);
    console.error("- Stack trace:", error.stack);

    res.status(500).json({
      error: true,
      message: "Server error during registration",
      detail: error.message || "Unknown error occurred",
    });
  }
});

// ----- login route ----- */
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      error: true,
      message: "Identifier and password are required",
    });
  }

  try {
    console.log("Login attempt for:", identifier);

    // validate JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging line to check JWT_SECRET

    // locate user by username or email
    const user = await knex("users")
      .where(function () {
        this.where({ username: identifier }).orWhere({ email: identifier });
      })
      .first();

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User not found",
      });
    }

    // compare password with hash
    const isMatch = await bcryptjs.compare(
      password,
      user.password_hash || user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    // generate the jwt
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token as an HTTP-Only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: true,
      message: "Login failed",
      detail: error.message || "Unknown error occurred",
    });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;

// TODO add change && forgot password routes
// change password might go on the user profile page, forgot should be on login page
