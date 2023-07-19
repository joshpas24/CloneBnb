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
        city: "Beverly Hills",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Beverly Hills Mansion",
        description: "Inspired by the French countryside, this Beverly Hills residence exudes the ideal mix of modernity and charm. Canyon landscapes undulate beyond the soaring windows; inside, the home is drenched in natural light. Slip into the zero-edge pool whenever you need an instant refresh. Trees cast dappled shadows on the lavish yard. Access to shopping, sights, and restaurants are mere minutes away by car.",
        price: 6123,
      },
      {
        ownerId: 2,
        address: "1143 Churchill Drive",
        city: "Malibu",
        state: "California",
        country: "United States of America",
        lat: 24.875839,
        lng: -80.438290,
        name: "Beachside Estate",
        description: "Malibu Beachside Estate boasts one of the best views of a local's favorite surf spot along the Pacific Coast Highway. Featuring a 60-ft-wide great room with 16-ft-high ceilings and extraordinary views of the Pacific Ocean. It is fully equipped with all luxury amenities including a  wet bar, a state-of-the-art theater, an open chef’s kitchen, a breakfast room, a refrigerated wine cellar, and a well appointed work out area. Twin primary bedrooms on either side of the villa have ocean views.",
        price: 4322,
      },
      {
        ownerId: 3,
        address: "100 Apache Creek Rd",
        city: "Joshua Tree",
        state: "California",
        country: "United States of America",
        lat: 40.324890,
        lng: -111.111111,
        name: "The Desert Box",
        description: "The desert is wild and if you are very sensitive to insects, mice & bugs - it may not be for you. If you leave a door open, animals ,flys , bugs and more might run in. There are indeed rare sightings of snakes, ants & spiders out here. We love it and so do most of our guests, but just a friendly reminder that we are indeed in the wild. And we are always more than happy to have a creature safely relocated if you find it to be a threat.",
        price: 1276,
      },
      {
        ownerId: 4,
        address: "404 Lakeside Drive",
        city: "Big Bear Lake",
        state: "California",
        country: "United States of America",
        lat: 56.432890,
        lng: -314.134311,
        name: "Big Bear Summit House",
        description: "Immerse yourself in southern California’s high-alpine while staying at this centrally located 2-bedroom, 2-bathroom vacation rental In Big Bear Lake! Mere steps away from Snow Summit Ski Resort’s trails and a short drive to the lake, this cabin is primed for 4-seasons of outdoor activities. Shred the slopes on a powder day or layout and work on your tan at Ski Beach Park, then return home for evenings for homemade meals. Fenced backyard and pet friendly.",
        price: 449,
      },
      {
        ownerId: 5,
        address: "5770 Beautmont Drive",
        city: "Del Monte",
        state: "California",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Pebble Estate",
        description: "Panoramic Ocean View Estate in Pebble Beach. The main residence was designed to take advantage of the 180-degree panoramic views from most of the rooms. You will be just a short drive out the back of the property onto the 17 Mile drive that offers many world-famous attractions",
        price: 2320,
      },
      {
        ownerId: 1,
        address: "4932 Fairview Rd",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Hillside Villa",
        description: "Perched just off Mulholland Drive in the Hollywood Hills, this ultra-luxurious five-bedroom boasts incredible city-views and an unbeatable location for exploring the countless attractions of greater Los Angeles. From Rouge Elite’s spacious balcony, you’ll be able to see from the valley, on to the Hollywood sign, and all the way to Catalina. Rouge Elite has total accommodations for ten and plenty of open space, making it perfect for a family vacation or group getaway with friends.",
        price: 5623,
      },
      {
        ownerId: 1,
        address: "887 Sundance Blvd",
        city: "Rockville",
        state: "Utah",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Zion Oasis",
        description: "This is Zions most luxurious 14,000 sq ft property known as the Zion Red Rock Oasis nestled near the heart of Zion National Park known for its slot canyons, red rock natural arches with some of the best destinations for hiking and biking, now you can experience this unique property with your friends and family.",
        price: 4289,
      },
      {
        ownerId: 1,
        address: "887 Sundance Blvd",
        city: "Breckenridge",
        state: "Colorado",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Mountain Gem Estate",
        description: "The Mountain Gem Estate is the peak of luxury in the mountains of Breckenridge. Bring your friends and family to the ultimate destination, a six-bedroom mansion with stunning views, luxurious amenities and décor, and a convenient location in the Shock Hill neighborhood.",
        price: 1466,
      },
      {
        ownerId: 1,
        address: "3491 Vista Hill Dr",
        city: "Blaine",
        state: "Washington",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Oceanfront Cabin",
        description: "BAY FRAME is a 2 bedroom/1 bath + office  Oceanfront  A-frame Cabin with retro vibes and modern amenities. Located on high-bank waterfront with **Beach Access** & sweeping ocean views in the Pacific Northwest.  Now booking Summer 2023",
        price: 1660,
      },
      {
        ownerId: 1,
        address: "4452 Mountain Blvd",
        city: "Leavenworth",
        state: "Washington",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Mountain Dream Getaway",
        description: "Just 10 minutes to the little town of Leavenworth yet far enough to be out of the hustle and bustle. Soak in the mountain views, enjoy the wildlife and sounds of life on a small farm... Our house offers an open and bright kitchen/dining/living space, two bedrooms, one bathroom and a deck.",
        price: 889,
      },
      {
        ownerId: 1,
        address: "664 Sunset Blvd",
        city: "Encinitas",
        state: "California",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Encinitas Oceanfront",
        description: "Sit back & relax with endless of ocean frontage in your very own Encinitas beach house.  This newly remodeled entertainer’s delight comes equipped with a 2br+2ba main house + a separate upper level 1br+1ba suite (with its own entry), nearly 3,000sf of interior space that flows seamlessly to 3 separate outdoor areas, 2 levels with ocean views from nearly all rooms, 3 car parking, dog friendly, fire pit, short walk to Beacons beach, & sleeps 7. *Note no A/C in this home, fans are provided.",
        price: 995,
      },
      {
        ownerId: 1,
        address: "1440 Buswick Rd",
        city: "Temecula",
        state: "California",
        country: "United States of America",
        lat: 498.32423,
        lng: -249.3421,
        name: "Secluded Hilltop Getaway",
        description: "Gorgeous private retreat situated on an over 9-acre Spanish style estate in the hills of the prestigious De Luz wine tasting community in Temecula, minutes from Cross Creek Golf Club, Temecula’s Old Town, and Pechanga Casino. Secluded, with tons of natural beauty without missing on all the nearby modern conveniences.",
        price: 1049,
      }
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
