module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "scripthero",
      user: "damienlavizzo",
      password: "",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
