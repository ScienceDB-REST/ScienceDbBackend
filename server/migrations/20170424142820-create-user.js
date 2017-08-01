'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hash: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activationKey: {
        type: Sequelize.STRING,
        allowNull: true
      },
      resetPasswordKey: {
        type: Sequelize.STRING,
        allowNull: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
