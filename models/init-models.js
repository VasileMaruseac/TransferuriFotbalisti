var DataTypes = require('sequelize').DataTypes;
var _echipe = require('./echipe');
var _ligi = require('./ligi');
var _jucatori = require('./jucatori');

function initModels(sequelize) {
  var echipe = _echipe(sequelize, DataTypes);
  var ligi = _ligi(sequelize, DataTypes);
  var jucatori = _jucatori(sequelize, DataTypes);

  return {
    echipe,
    ligi,
    jucatori,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
