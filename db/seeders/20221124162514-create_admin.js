"use strict";

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Role } = require("../../app/models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123456";
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    const admin_name = ["Trisna", "Alviriza", "Naufal"];

    const admin_role = await Role.findOne({
      where: {
        name: "ADMIN",
      },
    });

    const buyer_name = ["Tantri", "Lathifa", "Nafis"];

    const buyer_role = await Role.findOne({
      where: {
        name: "BUYER",
      },
    });

    const admin = admin_name.map((name) => ({
      name,
      email: `${name.toLowerCase()}@binar.co.id`,
      encryptedPassword,
      role_id: admin_role.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    const buyer = buyer_name.map((name) => ({
      name,
      email: `${name.toLowerCase()}@binar.co.id`,
      encryptedPassword,
      role_id: buyer_role.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Users", [...admin, ...buyer], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { name: { [Op.in]: names } }, {});
  },
};
