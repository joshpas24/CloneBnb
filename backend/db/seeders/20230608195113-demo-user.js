'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // options.tableName = 'Users';
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Vishi',
        lastName: 'Suaz',
        email: 'yungvish@user.io',
        username: 'VishiSuaz',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Dua',
        lastName: 'Lipa',
        email: 'dualipa@email.com',
        username: 'DuaLipa',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Wilmer',
        lastName: 'LaFleure',
        email: 'wlafleure@user.io',
        username: 'damanager',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lebron',
        lastName: 'James',
        email: 'theking@goat.com',
        username: 'legoat',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users", {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'damanager', 'legoat'] }
    }, {});
  }
};
