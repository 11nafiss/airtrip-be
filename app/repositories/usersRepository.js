const { User, Role } = require("../models");
async function register(userData) {
  try {
    return await User.create({ ...userData, role_id: 1, saldo: 20000000 });
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

async function updateUser(id, updateParams) {
  try {
    let updatedUser = await User.update(updateParams, {
      where: {
        id,
      },
      returning: true,
    });

    return updatedUser[1][0];
  } catch (error) {
    throw error;
  }
}

async function findRole(roleId) {
  try {
    const role = await Role.findByPk(roleId);
    return role;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  findUserByEmail,
  updateUser,
  findRole,
};
