const EmailAlreadyRegisteredError = require("./EmailAlreadyRegisteredError");
const EmailNotRegisteredError = require("./EmailNotRegistered");
const WrongPasswordError = require("./WrongPasswordError");
const UnauthorizedError = require("./UnauthorizedError");
const RecordNotFoundError = require("./RecordNotFoundError");

module.exports = {
  EmailAlreadyRegisteredError,
  EmailNotRegisteredError,
  WrongPasswordError,
  UnauthorizedError,
  RecordNotFoundError,
};
