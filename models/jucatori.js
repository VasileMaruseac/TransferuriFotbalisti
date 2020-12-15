/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = async function (sequelize, DataTypes) {
  const Jucatori = sequelize.define(
    'jucatori',
    {
      idJucator: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nume: {
        type: DataTypes.STRING(65),
        allowNull: false,
        unique: 'nume_UNIQUE',
      },
      nationalitate: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      dataNastere: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      idEchipa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      valoare: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'jucatori',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{name: 'idJucator'}],
        },
        {
          name: 'nume_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [{name: 'nume'}],
        },
      ],
    }
  );
  await Jucatori.sync();
};
