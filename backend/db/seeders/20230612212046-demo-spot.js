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
        address: "572 Meadowbrook Lane",
        city: "Laguna Beach",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Modern Suburban Getaway",
        description: "Enjoy state of the art ammenities at this modern sanctuary, just minutes from the beach.",
        price: 123,
      },
      {
        ownerId: 2,
        address: "1143 Churchill Drive",
        city: "Springfield",
        state: "Tennessee",
        country: "United States of America",
        lat: 24.875839,
        lng: -80.438290,
        name: "Cabin in the Woods",
        description: "This majestic house sits alone in its own 5 acres of property. The dream getaway for couples and families looking for some peace and quiet",
        price: 322,
      },
      {
        ownerId: 3,
        address: "100 Presidential Ave",
        city: "Washington DC",
        state: "Virginia",
        country: "United States of America",
        lat: 40.324890,
        lng: -111.111111,
        name: "The White House",
        description: "Enjoy living a day in the life of one of the most important people in the US. During your stay, you will enjoy making big decisions with the peace of mind knowing you are in maximum security.",
        price: 1776,
      },
      {
        ownerId: 4,
        address: "404 Scott Trail",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 56.432890,
        lng: -314.134311,
        name: "Texas Oasis",
        description: "Peaceful desert getaway with modern finishes and state of the art amenities!",
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
        name: "The Heart of Ohio",
        description: "Magical cabin in the heart of the beautiful state of Ohio. This is where dreams are made!",
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
