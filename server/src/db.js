const knex = require('knex');

/*
port:8080 is Express default port
port: 5432 is postgres default port - HTTP requests are routed here
we 'talk to' the Express server on 8080, and then Express 'talks to' the database on 8080 behind the scenes
we never directly connect to 8080
*/ 

// You can either use environment variables
const db = knex({
  client: 'postgresql',
  connection: {
    host: process.env.dbSQL_HOST || 'localhost',
    port: process.env.dbSQL_PORT || 5432,
    database: process.env.dbSQL_DATABASE || 'scripthero',
    user: process.env.dbSQL_USER || 'damienlavizzo',
    password: process.env.dbSQL_PASSWORD || ''
  },
  pool: {
    min: 2,
    max: 10
  }
});

// validates we're connected to the server
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = db;
