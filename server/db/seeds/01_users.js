/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcryptjs = require("bcryptjs"); // handles password hashing

exports.seed = async function (knex) {
  // Clear the users table
  await knex("users").del();

  // Create a test user with hashed password
  const password = "testpassword123";
  const saltRounds = 10;
  const hash = await bcryptjs.hash(password, saltRounds);

  await knex("users").insert([
    {
      username: "testuser1",
      email: "test@example.com",
      password_hash: hash,
    },
    {
      username: "testuser2",
      email: "fakemail@example.com",
      password_hash: hash,
    },
    {
      username: "testuser3",
      email: "practice@example.com",
      password_hash: hash,
    },
    {
      username: "testuser4",
      email: "newemail@example.com",
      password_hash: hash,
    },
    {
      username: "testuser5",
      email: "example@example.com",
      password_hash: hash,
    }
  ]);
};
