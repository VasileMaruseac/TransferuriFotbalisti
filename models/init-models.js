var DataTypes = require('sequelize').DataTypes;
var _jucatori = require('./jucatori');
var _echipe = require('./echipe');
var _ligi = require('./ligi');
var _transferuri = require('./transferuri');

function initModels(sequelize) {
  var jucatori = _jucatori(sequelize, DataTypes);
  var echipe = _echipe(sequelize, DataTypes);
  var ligi = _ligi(sequelize, DataTypes);
  var transferuri = _transferuri(sequelize, DataTypes);

  return {
    ligi,
    echipe,
    jucatori,
    transferuri,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
