'use strict';

module.exports = {

    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('plants', {

            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            createdAt: {
                type: Sequelize.DATE
            },

            updatedAt: {
                type: Sequelize.DATE
            },


            experimentDbId: {
                type: Sequelize.STRING
            },

            experimentURI: {
                type: Sequelize.STRING
            },

            experimentId: {
                type: Sequelize.STRING
            },

            experimentName: {
                type: Sequelize.STRING
            },

            experimentObjective: {
                type: Sequelize.STRING
            },

            experimentType: {
                type: Sequelize.STRING
            },

            experimentLocation: {
                type: Sequelize.STRING
            },

            experimentProject: {
                type: Sequelize.STRING
            },

            experimentPlateform: {
                type: Sequelize.STRING
            },

        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('plants');
    }

};