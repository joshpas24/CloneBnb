'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: "1111 S Figueroa St",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 24.875839,
        lng: -80.438290,
        name: "Crypto Arena",
        description: "Home of the Lakers",
        price: 322,
      },
      {
        ownerId: 3,
        address: "100 Presidential Way",
        city: "Washington DC",
        state: "Virinia",
        country: "United States of America",
        lat: 40.324890,
        lng: -111.111111,
        name: "The White House",
        description: "Presidential residence with maximum security",
        price: 1776,
      },
      {
        ownerId: 4,
        address: "200 Death Rd",
        city: "Reno",
        state: "Nevada",
        country: "United States of America",
        lat: 56.432890,
        lng: -314.134311,
        name: "Nevada Oasis",
        description: "Peaceful desert getaway with modern finishes and great air conditioning",
        price: 849,
      },
      {
        ownerId: 5,
        address: "1738 Fetty Way",
        city: "Akron",
        state: "Ohio",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Lebron James' Childhood Home",
        description: "Magical home riddled with greatness and goats",
        price: 623,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
