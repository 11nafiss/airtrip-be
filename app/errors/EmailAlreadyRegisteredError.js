class EmailAlreadyRegisteredError extends Error {
  constructor(email) {
    super(`${email} already registered!`);
    this.email = email;
  }
}

module.exports = EmailAlreadyRegisteredError;
