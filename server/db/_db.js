var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
var db = new Sequelize("postgres://edvances:3dvanc3d@52.187.73.126:5432/edvancesdb", {
    logging: env.LOGGING
});

module.exports = db;