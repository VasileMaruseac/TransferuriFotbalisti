var DataTypes = require("sequelize").DataTypes;
var _echipe = require("./echipe");
var _jucatori = require("./jucatori");
var _ligi = require("./ligi");
var _transferuri = require("./transferuri");

function initModels(sequelize) {
  var echipe = _echipe(sequelize, DataTypes);
  var jucatori = _jucatori(sequelize, DataTypes);
  var ligi = _ligi(sequelize, DataTypes);
  var transferuri = _transferuri(sequelize, DataTypes);


  return {
    echipe,
    jucatori,
    ligi,
    transferuri,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
