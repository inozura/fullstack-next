require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve("./db-jobs.sqlite"),
    },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
    },
    useNullAsDefault: true,
  },
};
