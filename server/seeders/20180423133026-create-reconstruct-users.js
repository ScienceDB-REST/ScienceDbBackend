'use strict';
var path = require('path')
var models = require(path.join(__dirname, '..', 'models', 'index.js'))
var Promise = require('bluebird')

const reconstructUsers = [{
    email: 'asis.hallab@gmail.com',
    name: 'Asis Hallab',
    password: 'admin'
  },
  {
    email: 'm.bucher@uni-koeln.de',
    name: 'Marcel Bucher',
    password: 'Marcel01!Bucher10'
  },
  {
    email: 'sreicha3@uni-koeln.de',
    name: 'Sina Reichhardt',
    password: 'Sina03!Reichhardt30'
  },
  {
    email: 'tim.mansfeldt@uni-koeln.de',
    name: 'Tim Mansfeldt',
    password: 'Tim04!Mansfeldt40'
  },
  {
    email: 'k.dorau@uni-koeln.de',
    name: 'Kristof Dorau',
    password: 'Kristof05!Dorau50'
  },
  {
    email: 'uwe.sonnewald@fau.de',
    name: 'Uwe Sonnewald',
    password: 'Uwe06!Sonnewald60'
  },
  {
    email: 'schlef@mpipz.mpg.de',
    name: 'Paul Schulze-Lefert',
    password: 'Paul07!Schulze70'
  },
  {
    email: 'spaepen@mpipz.mpg.de',
    name: 'Stijn Spaepen',
    password: 'Stijn08!Spaepen80'
  },
  {
    email: 'bourceret@mpipz.mpg.de',
    name: 'Amelia Bourceret',
    password: 'Amelia09!Bourceret90'
  },
  {
    email: 'schneeberger@mpipz.mpg.de',
    name: 'Korbinian Schneeberger',
    password: 'Korbinian10!Schneeberger10'
  },
  {
    email: 'b.usadel@fz-juelich.de',
    name: 'Björn Usadel',
    password: 'Björn01!Usadel10'
  },
  {
    email: 'fernie@mpimp-golm.mpg.de',
    name: 'Alisdair Fernie',
    password: 'Alisdair02!Fernie20'
  },
  {
    email: 'Omidbakhshfard@mpimp-golm.mpg.de',
    name: 'Amin Omidbakhshfard',
    password: 'Amin03!Omidbakhshfard30'
  },
  {
    email: 'nikoloski@mpimp-golm.mpg.de',
    name: 'Zoran Nikoloski',
    password: 'Zoran04!Nikoloski40'
  },
  {
    email: 'walter.richner@agroscope.admin.ch',
    name: 'Walter Richner',
    password: 'Walter05!Richner50'
  },
  {
    email: 'Jochen.Mayer@agroscope.admin.ch',
    name: 'Jochen Mayer',
    password: 'Jochen06!Mayer60'
  },
  {
    email: 'rene.flisch@agroscope.admin.ch',
    name: 'Rene Flisch',
    password: 'Rene07!Flisch70'
  },
  {
    email: 'jsix@ethz.ch',
    name: 'Johan Six',
    password: 'Johan08!Six80'
  },
  {
    email: 'a.mahn@fz-juelich.de',
    name: 'Andreas Mahn',
    password: 'Andreas09!Mahn90'
  },
  {
    email: 'basler@mpimp-golm.mpg.de',
    name: 'Georg Basler',
    password: 'Georg01!Basler10'
  },
  {
    email: 'joerg.hofmann@fau.de',
    name: 'Joerg Hofmann',
    password: 'Joerg06!Hofmann60'
  },
  {
    email: 'barbara.orth@agroscope.admin.ch',
    name: 'Barbara Orth',
    password: 'Barbara09!Orth90'
  }
]

module.exports = {
  up: async function(queryInterface, Sequelize) {
    return await models.Role.findAll().then(function(r) {
      return Promise.map(reconstructUsers, function(usrData) {
        return new Promise(function(resolve, reject) {
          models.User.register(models.User.build({
            email: usrData.email,
            name: usrData.name
          }), usrData.password, function(err, user) {
            if (err) {
              console.log("Error in REGISTRATION!\n" + err);
            }
            console.log(
              `Created a new RECONSTRUCT-User: '${user.email}'`
            );
            return r.map(function(i) {
              return models.User2Role.create({
                UserId: user.id,
                RoleId: i.id
              })
            })
          })
        }).then(newUsr => {
          return newUsr
        })
      })
    })
  },

  down: function(queryInterface, Sequelize) {
    return models.User.destroy({
      where: {
        email: reconstructUsers.map(x => {
          return x.email
        })
      }
    })
  }
};
