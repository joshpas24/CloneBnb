'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/24cc494b-eb24-48ab-97e4-decdd052d590.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/361e4c01-3c5a-4ac3-ad6c-4f235bd6a726.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/1a519734-c4d7-49c4-ada9-6e45346d334a.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/69d0d060-d140-4110-bcea-14bd86295372.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/0a9988db-13b1-4087-a01f-65773f93fc8d.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-813949239894880001/original/b2abe806-b60f-4c0b-b4e6-46808024e5b6.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-813949239894880001/original/c1e73adc-959e-44e4-ab1d-86892824d262.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-813949239894880001/original/c4031456-dc24-4683-ba84-6cdac0c2cb65.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-813949239894880001/original/7b33ba79-f553-4bac-a493-164813bb4253.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-813949239894880001/original/e0ed8801-5276-49f2-80e3-b6537681ecf8.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-684038440211875988/original/8da16e68-fb8e-4046-8a9c-28658e217068.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-684038440211875988/original/7f49d1d4-ec15-4092-9964-73d723ec135c.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-684038440211875988/original/640596a5-a30a-48bd-ac60-592d067dbacf.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-684038440211875988/original/2ab5fe55-4b51-49c0-869a-67009780d5f0.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-684038440211875988/original/f0132f37-10be-4145-8a1b-8718cedb6d7c.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50708967/original/329631a3-6201-46d1-a7df-5615b3d1fa34.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50708967/original/79600199-dee8-4563-8e41-f7782c9170bd.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50708967/original/cb582c4b-9978-4c27-bcda-ac1a6ea5a23f.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/3237f530-2cd5-4222-8c0d-008eac67123b.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50708967/original/cb8299a2-fbfc-48a6-a7a1-41cc7d5de9a4.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-548040122604146500/original/1e562b7a-27e7-46f2-9f3f-a3328b9207f0.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-548040122604146500/original/19ceed42-9220-4955-b1c1-bba832a9631b.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-548040122604146500/original/56698f83-fda1-4e24-abbe-2531e7c85ebb.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-548040122604146500/original/394df489-8457-45bf-b80c-376032d9683f.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-548040122604146500/original/4a8ef4c2-b93b-4428-8233-10a7a0c15677.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-29389469/original/5ed29802-44b4-42cb-b452-870a2892df73.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-29389469/original/4d22ed10-d566-41af-98a5-24a40bef58b3.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-29389469/original/96451158-4ae7-4796-ac8c-e2498a1c0812.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-29389469/original/db556256-c370-4a34-a90b-a6dce701191b.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/f5d34f56-7766-46c1-b41d-35fabf51b429.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/1057bb61-926f-4fef-af15-6b395fa8ab4b.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/852f71d7-a4bf-4e54-859b-f8ca763d076a.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/71fbee7a-a557-4f2a-9f42-0bbd43940da0.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/5e4019d5-468f-4ab0-8861-65dbeb0369c6.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/e8dec054-d24f-4a98-ab93-c623b7abb776.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53381307/original/28012a43-89cb-410e-8103-cba29a3237ab.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53381307/original/b82d0119-83b5-49d7-9c9a-8e4dbb17d44d.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53381307/original/d5523fb8-9c86-45c5-ae4e-edb571b554d5.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53381307/original/a35f917b-db23-44c7-9b53-a84535cac6b6.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53381307/original/a1472405-f63c-4377-b20c-014dfc1b66aa.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-625261951865938865/original/94c1bba1-508c-418b-9ae7-e89cd87fec29.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-625261951865938865/original/06596747-bbcf-4512-ab7f-8d2227348fbc.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-625261951865938865/original/28ebd9fb-23f0-4a74-aad4-92998c88bd68.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-625261951865938865/original/a4d52eed-46f4-47df-a5a4-48ffb963251e.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-625261951865938865/original/509cc984-db62-451c-96a5-7e63d12780f1.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/42e3bbc1-3ce9-4823-8f88-43cd6f8aadc2.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/6c44b60d-aedb-48f4-bb3e-8d78d442c660.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/970b690d-8574-4c3a-b34a-964fc9efa2e2.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/986f9531-751c-4dbe-86ad-150807ba38ff.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/4616fbf9-0b7c-4ffd-8d70-e78b3ef29b76.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47094341/original/23af6cfa-d9ba-4098-b973-1c8227ecfa6f.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47094341/original/f959d695-c828-4b25-be0e-7a527162d3cc.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47094341/original/6edc44c4-7483-4c92-9a62-dc0f27e700c2.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47094341/original/bece9cd9-4ec9-4121-ad7a-91bc36df762d.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47094341/original/e5d8b301-16a5-435f-ac23-19735f0ea27c.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-580398742042753105/original/cf49334a-eee6-4ce2-9ecb-4170b1b22c34.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-580398742042753105/original/100c66b0-9eea-44de-8a7b-502d97ebc6bc.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-580398742042753105/original/e1bb3617-b8b7-4d98-95ba-8b6c43b798a0.png?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-580398742042753105/original/690a3e45-7f4f-4f52-8970-47b279c93656.png?im_w=1200",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-580398742042753105/original/aaedd00b-a2cf-44bc-b602-c255c47cd1fa.png?im_w=720",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/2fec6a2b-226e-4155-808c-3e1767184772.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/403ef27b-1825-4b07-9173-8eba8ad1f724.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-13776/original/21911064-22bb-4a0e-8fb9-4b960f83ed6e.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/8738d253-61ef-408a-89f4-c5d2c9959cca.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/21d4a512-3172-41a7-b5d7-2fcd09775bef.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-3824645/original/00871194-fbdf-499b-9ac7-bd0266e7eaac.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-3824645/original/3a2a3b29-0783-4d39-8364-d9849efd4935.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-3824645/original/3dcbb08b-73fc-4461-863d-80467eb4f285.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-3824645/original/5884a62a-5e10-4cd5-bd33-5ed8cb30a486.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-3824645/original/d55f5f18-4795-4df9-88d5-2ccd2b8bea71.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-660864791121030178/original/274dc1f9-c1fe-4de8-aa3f-68fabc31e332.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-660864791121030178/original/0cb412d7-7da2-4691-8b03-942e8c347952.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-660864791121030178/original/67d1fcb1-0393-4734-b89d-b6dad690ce1b.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-660864791121030178/original/e73a3acb-3576-4c79-9a72-cad201a56ad6.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-660864791121030178/original/3c0dc7c2-cbb4-4cf5-addf-1fe8a988cbca.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/f7359869-7289-4471-83c7-bb3ab02e4fc2.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-813193949933411044/original/7d815c62-7bc1-474f-ab10-163c2e7a810f.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/75d264ea-f395-43e8-b484-9967c947147b.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-813193949933411044/original/37dcff17-b30c-4bb6-8613-d9e5f4769968.png?im_w=720",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/c35cfc10-60e5-43ff-a19d-fbc7121bb192.jpg?im_w=720",
        preview: false
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
