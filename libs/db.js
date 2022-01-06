const path = require("path");

var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.resolve("./db-jobs.sqlite"),
  },
  useNullAsDefault: true,
  // connection: {
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME
  // }
});

// knex("users").insert([{ email: "" }, { password: "" }]);
// knex("posts").insert([{ title: "" }, { content: "" }]);

// console.log("log", path.resolve("./db-jobs.sqlite"));

export default knex;
