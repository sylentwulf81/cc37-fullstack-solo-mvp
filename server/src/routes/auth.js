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
      return res.status(400).json({ message: "User already exists!" });
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
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login attempt for: ", username);

    // validate JWT
    console.log(`JWT Secret Exists:`, !!process.env.JWT_SECRET);
    console.log(`JWT Secret: `, process.env.JWT_SECRET);
    // locate user
    const user = await knex("users").where({ username }).first();

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // compare password with hash
    const isMatch = await bcryptjs.compare(
      password,
      user?.password_hash || user?.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // generate the jwt
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // might need to be longer
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
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
