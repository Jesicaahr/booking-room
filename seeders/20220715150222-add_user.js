'use strict';

const { encryptPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@mail.com',
      password: encryptPassword('iniadmin'),
      status: 'admin',
      createdAt: new Date(),
			updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
