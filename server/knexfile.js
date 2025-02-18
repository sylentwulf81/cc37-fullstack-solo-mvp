require("dotenv").config({ path: "./.env.local" });

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = "127.0.0.1";
const DB_PORT = "8080";
const DB_NAME = process.env.DB_NAME;
const DB_URL = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: DB_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
