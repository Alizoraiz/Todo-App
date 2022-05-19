'use strict';
//import FakerUser from '../faker'
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      userId:"2a7a8a91-d65d-4c73-aa1c-5452177c45bu",
      username: "burhan",
      password: "jjdsdsalkh",
      email: "burhan@gmail",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
