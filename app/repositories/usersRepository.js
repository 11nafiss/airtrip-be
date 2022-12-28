const { User, Role } = require("../models");
async function register(userData) {
  return await User.create({ ...userData, role_id: 1, saldo: 20000000 });
}

async function findUserByEmail(email) {
  return await User.findOne({
    where: { email },
    include: Role,
  });
}

async function updateUser(id, updateParams) {
  let updatedUser = await User.update(updateParams, {
    where: {
      id,
    },
    returning: true,
  });

  return updatedUser[1][0];
}

async function findRole(roleId) {
  const role = await Role.findByPk(roleId);
  return role;
}

module.exports = {
  register,
  findUserByEmail,
  updateUser,
  findRole,
};
