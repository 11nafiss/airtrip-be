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
  const existingUser = await usersRepo.findUserByEmail(userData.email);

  if (existingUser !== null) {
    const err = new EmailAlreadyRegisteredError(userData.email);
    return err;
  }
  const user = await usersRepo.register({
    ...userData,
    encryptedPassword: encryptPass(userData.password),
  });

  return user.email;
}

async function login(userData) {
  const existingUser = await usersRepo.findUserByEmail(userData.email);

  if (existingUser === null) {
    return new EmailNotRegisteredError(userData.email);
  }

  if (bcryptjs.compareSync(userData.password, existingUser.encryptedPassword)) {
    return createToken(existingUser);
  }

  return new WrongPasswordError();
}

async function authorize(token, expectedRole) {
  try {
    const { iat, ...payload } = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY
    );

    const user = await usersRepo.findUserByEmail(payload.email);

    if (user === null) {
      throw new Error("User not found!");
    }

    if (expectedRole !== payload.role.name && expectedRole !== true) {
      throw new Error("Invalid role!");
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
  createToken,
};
