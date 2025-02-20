const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const config = {
  isDevelopment: process.env.NODE_ENV !== "production",
  db: {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "script_hero",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
  },
  server: {
    port: process.env.PORT || 8080,
  },
};

console.log("Configuration loaded:");
console.log("Environment:", process.env.NODE_ENV);
console.log("Database:", {
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
});

module.exports = config;
