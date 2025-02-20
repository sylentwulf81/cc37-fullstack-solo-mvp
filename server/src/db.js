const { Pool } = require("pg");
const knex = require("knex");
const config = require("../knexfile");

// Determine environment
const isDevelopment = process.env.NODE_ENV !== "production";

// Initialize knex with the appropriate configuration
const knexInstance = knex(
  isDevelopment ? config.development : config.production
);

// Set up connection config based on environment
let dbConfig;

if (isDevelopment) {
  console.log("Using local development database 'script_hero'...");
  dbConfig = {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "script_hero",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
  };
} else {
  console.log("Using production database");
  dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    ssl: { rejectUnauthorized: false },
  };
}

// Log connection config (without sensitive info)
console.log("Database Configuration:");
console.log("- Host:", dbConfig.host);
console.log("- Port:", dbConfig.port);
console.log("- Database:", dbConfig.database);
console.log("- User:", dbConfig.user);

// handles frequent connections / disconnections in development environment
const pool = new Pool(dbConfig);

// Test the connection immediately
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to PostgreSQL!");

    // Test query to verify database access
    const result = await client.query("SELECT current_database() as db_name");
    console.log("Connected to database:", result.rows[0].db_name);

    client.release();
    return true;
  } catch (err) {
    console.error("Database connection error:");
    console.error("- Error name:", err.name);
    console.error("- Error message:", err.message);
    console.error("- Error code:", err.code);
    if (err.code === "ECONNREFUSED") {
      console.error("Connection refused. Is PostgreSQL running?");
    } else if (err.code === "3D000") {
      console.error("Database does not exist!");
    } else if (err.code === "28P01") {
      console.error("Invalid password for user!");
    }
    throw err;
  }
}

// Run the test connection
testConnection().catch((err) => {
  console.error("Failed to establish initial connection");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  knex: knexInstance,
};
