/*
    Resolvers for basic CRUD operations
*/

const plant = require('../models/index').plant;
const searchArg = require('../utils/search-argument');
const fileTools = require('../utils/file-tools');
var checkAuthorization = require('../utils/check-authorization');
const axios = require('axios');


module.exports = {
    plants: function({experimentURI}, context) {
      //get token for access
      return axios.get('http://147.100.175.100:8080/phenomeapi/resources/token',{
        params:{
          username:'guestphis@supagro.inra.fr',
          password:'guestphis'
        }
      }).then( response =>{
        let token = response.data.session_token;
        console.log(token);
        //get actual data
        return axios.get('http://147.100.175.100:8080/phenomeapi/resources/plants',{
          params:{
            experimentURI: experimentURI,
            sessionId: token
          }
        }).then(response_plants => {
          return response_plants.data.result.data;
        }).catch( error_plants => {
          console.log(error_plants);
        });
      }).catch( error => {
        console.log(error);
      });
    },

    /*
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
    */
    readOnePlant: function({experimentURI,plantURI}, context) {
      //get token for access
      return axios.get('http://147.100.175.100:8080/phenomeapi/resources/token',{
        params:{
          username:'guestphis@supagro.inra.fr',
          password:'guestphis'
        }
      }).then( response =>{
        let token = response.data.session_token;
        console.log(token);
        //get actual data
        return axios.get('http://147.100.175.100:8080/phenomeapi/resources/plants',{
          params:{
            experimentURI: experimentURI,
            plantURI: plantURI,
            sessionId: token
          }
        }).then(response_plants => {
          return response_plants.data.result.data[0];
        }).catch( error_plants => {
          console.log(error_plants);
        });
      }).catch( error => {
        console.log(error);
      });
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
