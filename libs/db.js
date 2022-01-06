var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./db-jobs.sqlite",
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

export default knex;
