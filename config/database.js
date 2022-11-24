/**
 * @file Manages database connection configuration.
 * @author NoFall887
 */
const dotenv = require("dotenv");
dotenv.config();

/** Destruct environment variable to get database configuration */
const {
  DB_USER = "",
  DB_PASSWORD = "",
  DB_HOST = "",
  DB_NAME = "",
} = process.env;

console.log(DB_NAME, DB_USER);

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_production`,
    host: DB_HOST,
    dialect: "postgres",
  },
};
