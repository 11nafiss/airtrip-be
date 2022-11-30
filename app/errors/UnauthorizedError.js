class UnauthorizedError extends Error {
  constructor(cause) {
    super(`Action unauthorized!`);
    this.cause = cause;
  }
}

module.exports = UnauthorizedError;
