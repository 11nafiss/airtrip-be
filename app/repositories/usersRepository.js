const { User } = require("../models");
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
