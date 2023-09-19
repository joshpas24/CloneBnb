'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // options.tableName = 'Bookings';
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('11-21-2023'),
        endDate: new Date('11-23-2023')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('10-21-2023'),
        endDate: new Date('11-25-2023')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('06-21-2032'),
        endDate: new Date('11-21-2032')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
