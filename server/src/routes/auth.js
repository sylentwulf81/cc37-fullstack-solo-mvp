require("dotenv").config();
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../db");
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await knex("users").where({ username }).first();
    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "User already exists!",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert new user
    const [newUser] = await knex("users")
      .insert({
        username,
        email,
        password_hash: hashedPassword,
      })
      .returning(["id", "username"]);

    res.status(201).json({
      message: "User created",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      error: true,
      message: "Server error during registration",
      detail: error.message || "Unknown error occurred"
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: "Username and password are required"
    });
  }

  try {
    console.log("Login attempt for:", username);
    
    // validate JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // locate user
    const user = await knex("users").where({ username }).first();
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User not found"
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
        message: "Invalid credentials"
      });
    }

    // generate the jwt
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
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
      detail: error.message || "Unknown error occurred"
    });
  }
});

module.exports = router;