const usersRepo = require("../repositories/usersRepository");
const bcryptjs = require("bcryptjs");
const {
  EmailAlreadyRegisteredError,
  WrongPasswordError,
} = require("../errors");
const EmailNotRegisteredError = require("../errors/EmailNotRegistered");

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

async function login(userData) {
  try {
    const existingUser = await usersRepo.findUserByEmail(userData.email);

    if (existingUser === null) {
      return new EmailNotRegisteredError(userData.email);
    }

    if (bcryptjs.compareSync(userData.password, existingUser.password)) {
      return existingUser;
    }

    return new WrongPasswordError();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
};
