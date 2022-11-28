const { User, Role } = require("../models");
async function register(userData) {
  try {
    return await User.create({ ...userData, roleId: 2 });
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    return await User.findOne({
      include: Role,
      where: { email },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  findUserByEmail,
};
