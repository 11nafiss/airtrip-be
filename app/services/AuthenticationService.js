const usersRepo = require("../repositories/usersRepository");
const bcryptjs = require("bcryptjs");

function encryptPass(password) {
  return bcryptjs.hashSync(password);
}

async function register(userData) {
  try {
    return await usersRepo.register({
      ...userData,
      password: encryptPass(userData.password),
    });
  } catch (error) {
    return error;
  }
}

module.exports = {
  register,
};
