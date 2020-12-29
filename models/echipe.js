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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buget: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
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
      {
        name: "idLiga_idx",
        using: "BTREE",
        fields: [
          { name: "idLiga" },
        ]
      },
    ]
  });
};
