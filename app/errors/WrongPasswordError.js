class WrongPasswordError extends Error {
  constructor() {
    super(`Incorrect password!`);
    this.email = email;
  }
}

module.exports = WrongPasswordError;
