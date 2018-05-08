/*
    Resolvers for basic CRUD operations
*/

const plant = require('../models/index').plant;
const searchArg = require('../utils/search-argument');
const fileTools = require('../utils/file-tools');
var checkAuthorization = require('../utils/check-authorization');

module.exports = {
    plants: function(_, context) {
        if (checkAuthorization(context, 'plants', 'read') == true) {
            return plant.findAll();
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    searchPlant: function({
        input
    }, context) {
        if (checkAuthorization(context, 'plants', 'read') == true) {
            let arg = new searchArg(input);
            let arg_sequelize = arg.toSequelize();
            return plant.findAll({
                where: arg_sequelize
            });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    readOnePlant: function({
        id
    }, context) {
        if (checkAuthorization(context, 'plants', 'read') == true) {
            return plant.findOne({
                where: {
                    id: id
                },
                include: [{
                    all: true
                }]
            });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    //addPlant: function(input, context) {
        //if (checkAuthorization(context, 'plants', 'create') == true) {
            //return plant.create(input)
                //.then(plant => {
                    //return plant;
                //});
        //} else {
            //return "You don't have authorization to perform this action";
        //}
    //},
//
    //bulkAddPlantXlsx: function(_, context) {
        //let xlsxObjs = fileTools.parseXlsx(context.request.files.xlsx_file.data.toString('binary'));
        //return plant.bulkCreate(xlsxObjs, {
            //validate: true
        //});
    //},
//
    //bulkAddPlantCsv: function(_, context) {
        ////delim = context.request.body.delim;
        ////cols = context.request.body.cols;
        //return fileTools.parseCsv(context.request.files.csv_file.data.toString())
            //.then((csvObjs) => {
                //return plant.bulkCreate(csvObjs, {
                    //validate: true
                //});
            //});
    //},
//
    //deletePlant: function({
        //id
    //}, context) {
        //if (checkAuthorization(context, 'plants', 'delete') == true) {
            //return plant.findById(id)
                //.then(plant => {
                    //return plant.destroy()
                        //.then(() => {
                            //return 'Item succesfully deleted';
                        //});
                //});
        //} else {
            //return "You don't have authorization to perform this action";
        //}
    //},
//
    //updatePlant: function(input, context) {
        //if (checkAuthorization(context, 'plants', 'update') == true) {
            //return plant.findById(id)
                //.then(plant => {
                    //return plant.update(input);
                //});
        //} else {
            //return "You don't have authorization to perform this action";
        //}
    //}
}
