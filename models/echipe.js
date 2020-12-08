/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('echipe', {
    idEchipa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nume: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "nume_UNIQUE"
    },
    idLiga: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'echipe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEchipa" },
        ]
      },
      {
        name: "nume_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nume" },
        ]
      },
    ]
  });
};
