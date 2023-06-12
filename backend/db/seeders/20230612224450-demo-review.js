'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 3,
        review: "Great stay! Old building but very safe",
        stars: 4
      },
      {
        userId: 2,
        spotId: 1,
        review: "Place kinda sucked, but will visit next year",
        stars: 3
      },
      {
        userId: 3,
        spotId: 2,
        review: "Amazing stay! Would recommend to a friend",
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
