const { User } = require("../models");
async function register(userData) {
  try {
    return await User.create({ ...userData, roleId: 2 });
  } catch (error) {
    return error;
  }
}

async function findUserByEmail(email) {
  try {
    return await User.findOne({
      where: { email },
    });
  } catch (error) {
    return error;
  }
}

module.exports = {
  register,
  findUserByEmail,
};
