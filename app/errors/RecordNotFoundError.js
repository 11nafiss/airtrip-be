class RecordNotFoundError extends Error {
  constructor(name) {
    super(`${name} not found!`);
  }
}

module.exports = RecordNotFoundError;
