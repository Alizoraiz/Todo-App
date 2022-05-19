'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('todos', [{
      todoId:'2a7a8a91-d65d-4c73-aa1c-5452177c45uu',
      name: 'Todo 77',
      price: '300',
      description: 'I am legend',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
