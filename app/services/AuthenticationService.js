const usersRepo = require("../repositories/usersRepository");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  EmailAlreadyRegisteredError,
  WrongPasswordError,
  UnauthorizedError,
  EmailNotRegisteredError,
} = require("../errors");

function encryptPass(password) {
  return bcryptjs.hashSync(password);
}

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      image: user.image,
      phone: user.phone,
      address: user.address,
      email: user.email,
      role: {
        id: user.Role.id,
        name: user.Role.name,
      },
    },
    process.env.JWT_SIGNATURE_KEY
  );
}

async function register(userData) {
  try {
    const existingUser = await usersRepo.findUserByEmail(userData.email);
    // console.log(existingUser);
    if (existingUser !== null) {
      const err = new EmailAlreadyRegisteredError(userData.email);
      return err;
    }
    const user = await usersRepo.register({
      ...userData,
      encryptedPassword: encryptPass(userData.password),
    });

    return user.email;
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

    if (
      bcryptjs.compareSync(userData.password, existingUser.encryptedPassword)
    ) {
      return createToken(existingUser);
    }

    return new WrongPasswordError();
  } catch (error) {
    throw error;
  }
}

async function authorize(token) {
  try {
    const { iat, ...payload } = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY
    );

    const user = await usersRepo.findUserByEmail(payload.email);

    if (user === null) {
      throw new Error("User not found");
    }

    return payload;
  } catch (error) {
    return new UnauthorizedError(error.message);
  }
}

module.exports = {
  register,
  login,
  authorize,
};
