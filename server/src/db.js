const knex = require("knex");

/*
port:8080 is Express default port
port: 5432 is postgres default port - HTTP requests are routed here
we 'talk to' the Express server on 8080, and then Express 'talks to' the database on 8080 behind the scenes
we never directly connect to 8080
*/

const config =
  process.env.NODE_ENV === "production"
    ? {
        client: "postgresql",
        connection: process.env.DATABASE_URL,
        pool: {
          min: 2,
          max: 10,
        },
        ssl: { rejectUnauthorized: false },
      }
    : {
        client: "postgresql",
        connection: {
          host: process.env.DB_HOST || "localhost",
          port: process.env.DB_PORT || 5432,
          database: process.env.DB_NAME || "scriptforge",
          user: process.env.DB_USER || "damienlavizzo",
          password: process.env.DB_PASSWORD || "",
        },
        pool: {
          min: 2,
          max: 10,
        },
      };

const db = knex(config);

// validates we're connected to the server
db.raw("SELECT 1")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

module.exports = db;
