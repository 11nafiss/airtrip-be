class EmailNotRegisteredError extends Error {
  constructor(email) {
    super(`${email} is not registered!`);
    this.email = email;
  }
}

module.exports = EmailNotRegisteredError;
