/**
 * @file Manages database connection configuration.
 * @author NoFall887
 */

// read env variable from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = null,
  DB_PASSWORD = null,
  DB_HOST = "127.0.0.1",
  DB_NAME = "airtrip",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
  },
};
