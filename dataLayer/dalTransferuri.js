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

module.exports = {
  addTransfer,
};
