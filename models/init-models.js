var DataTypes = require('sequelize').DataTypes;
var _ligi = require('./ligi');
var _echipe = require('./echipe');

function initModels(sequelize) {
  var ligi = _ligi(sequelize, DataTypes);
  var echipe = _echipe(sequelize, DataTypes);

  return {
    ligi,
    echipe,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
