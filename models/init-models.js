var DataTypes = require("sequelize").DataTypes;
var _ligi = require("./ligi");

function initModels(sequelize) {
  var ligi = _ligi(sequelize, DataTypes);


  return {
    ligi,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
