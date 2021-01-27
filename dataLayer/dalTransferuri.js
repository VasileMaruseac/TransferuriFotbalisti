const Sequelize = require('sequelize');
const initModels = require('../models/init-models').initModels;

const mysql = {
  dbname: 'proiectppaw',
  user: 'vasi',
  pass: '@DminTest123!',
  options: {dialect: 'mysql', port: 3306},
};
const sequelize = new Sequelize(
  mysql.dbname,
  mysql.user,
  mysql.pass,
  mysql.options
);

const models = initModels(sequelize);

const addTransfer = async (body) => {
  const transferuri = await models.transferuri;
  try {
    await transferuri.create(body);
    return 'created';
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const getAllTransfers = async () => {
  const transferuri = await models.transferuri;
  try {
    const result = await transferuri.findAll();
    return result;
  } catch (err) {
    return 'error';
  }
};

const deleteTransfer = async (id) => {
  var transferuri = await models.transferuri;
  await transferuri.destroy({where: {idTransfer: id}});
};

module.exports = {
  addTransfer,
  getAllTransfers,
  deleteTransfer,
};
