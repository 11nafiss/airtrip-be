const usersRepository = require("../repositories/usersRepository");
const cloudinary = require("../../config/cloudinary");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fileType = require("file-type");
const { EmailAlreadyRegisteredError, UnauthorizedError } = require("../errors");

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

async function uploadImg(imgBase64) {
  const base64String = imgBase64.split(",")[1];
  const mimetype = await fileType.fromBuffer(
    Buffer.from(base64String, "base64")
  );

  const file = `data:${mimetype.mime};base64,${base64String}`;

  try {
    const imgUrl = await cloudinary.uploader.upload(file);
    return imgUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
      updateParams.image = (await uploadImg(updateParams.image)).secure_url;
    } else {
      updateParams.image = existingUser.image;
    }

    const updatedUser = await usersRepository.updateUser(id, updateParams);

    const accessToken = createToken(updatedUser, user.role);

    return { user: updatedUser, accessToken };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  updateUser,
};
