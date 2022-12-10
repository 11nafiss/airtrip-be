const { User, Role } = require("../models");
async function register(userData) {
  try {
    return await User.create({ ...userData, role_id: 1 });
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    return await User.findOne({
      where: { email },
      include: Role,
    });
  } catch (error) {
    throw error;
  }
}

async function updateUser({
  id,
  name,
  image,
  phone,
  address,
  email,
  encryptedPassword,
}) {
  try {
    let updatedUser = await User.update(
      { name, image, phone, address, email, encryptedPassword },
      {
        where: {
          id,
        },
      }
    );

    return updatedUser[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  findUserByEmail,
  updateUser,
};
