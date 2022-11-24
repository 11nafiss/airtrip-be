const usersRepo = require("../repositories/usersRepository");

async function register(userData) {
  try {
    return await usersRepo.register(userData);
  } catch (error) {
    return error;
  }
}

module.exports = {
  register,
};
