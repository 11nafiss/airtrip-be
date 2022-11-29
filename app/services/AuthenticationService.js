const usersRepo = require("../repositories/usersRepository");
const bcryptjs = require("bcryptjs");
const { EmailAlreadyRegisteredError } = require("../errors");

function encryptPass(password) {
  return bcryptjs.hashSync(password);
}

async function register(userData) {
  try {
    const existingUser = await usersRepo.findUserByEmail(userData.email);

    if (existingUser !== null) {
      const err = new EmailAlreadyRegisteredError(userData.email);
      return err;
    }
    const user = await usersRepo.register({
      ...userData,
      password: encryptPass(userData.password),
    });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
};
