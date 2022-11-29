class WrongPasswordError extends Error {
  constructor() {
    super(`Incorrect password!`);
  }
}

module.exports = WrongPasswordError;
