var DataTypes = require('sequelize').DataTypes;
var _echipe = require('./echipe');
var _ligi = require('./ligi');

function initModels(sequelize) {
  var echipe = _echipe(sequelize, DataTypes);
  var ligi = _ligi(sequelize, DataTypes);

  return {
    echipe,
    ligi,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
