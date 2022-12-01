/**
 * @file Manages database connection configuration.
 * @author NoFall887
 */
const dotenv = require("dotenv");
dotenv.config();

// read env variable from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/** Destruct environment variable to get database configuration */
const {
  DB_HOST = "127.0.0.1",
  DB_NAME = "airtrip",
  DB_PORT = "5432",
  DB_USER = null,
  DB_PASSWORD = null,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
};
