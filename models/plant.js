'use strict';

module.exports = function(sequelize, DataTypes) {
    var Plant = sequelize.define('plant', {

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

    Plant.associate = function(models) {

    };

    return Plant;
};