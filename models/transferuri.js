/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = async function (sequelize, DataTypes) {
  const Transferuri = sequelize.define(
    'transferuri',
    {
      idTransfer: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idJucator: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idEchipaVeche: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idEchipaNoua: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pret: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'transferuri',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{name: 'idTransfer'}],
        },
      ],
    }
  );
  await Transferuri.sync();
  return Transferuri;
};
