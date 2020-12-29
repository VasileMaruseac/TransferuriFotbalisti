/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ligi', {
    idLiga: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tara: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nume: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "nume_UNIQUE"
    },
    lastUpdatedTime: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'ligi',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLiga" },
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
