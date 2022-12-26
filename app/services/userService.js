const usersRepository = require("../repositories/usersRepository");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { EmailAlreadyRegisteredError, UnauthorizedError } = require("../errors");
const uploadImg = require("./utils/uploadImage");
function createToken(user, role) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      image: user.image,
      phone: user.phone,
      address: user.address,
      email: user.email,
      role: {
        id: role.id,
        name: role.name,
      },
    },
    process.env.JWT_SIGNATURE_KEY
  );
}

async function updateUser(id, updateParams, user) {
  /* updateParams = {name, image, phone, address, email, password,}*/
  try {
    if (id !== user.id.toString()) {
      const err = new UnauthorizedError("token doesn't match the user id!");
      return err;
    }

    const existingUser = await usersRepository.findUserByEmail(
      updateParams.email
    );

    if (existingUser !== null && updateParams.email !== user.email) {
      const err = new EmailAlreadyRegisteredError(updateParams.email);
      return err;
    }

    updateParams.password = bcryptjs.hashSync(updateParams.password);
    if (updateParams.image !== "") {
      updateParams.image = await uploadImg(updateParams.image);
    } else {
      updateParams.image = existingUser.image;
    }

    const { encryptedPassword, saldo, verified, ...updatedUser } = (
      await usersRepository.updateUser(id, updateParams)
    ).dataValues;

    const accessToken = createToken(updatedUser, user.role);

    return { data: updatedUser, accessToken };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  updateUser,
};
