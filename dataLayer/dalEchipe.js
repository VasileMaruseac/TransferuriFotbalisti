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
var echipe = models.echipe;

const getEchipaById = async (id) => {
  const s = await echipe.findAll({where: {idEchipa: id}});
  if (s[0]) {
    return s[0].dataValues;
  } else {
    return 'notFound';
  }
};

const updateEchipa = async (idEchipa, body) => {
  try {
    await echipe.update(body, {where: {idEchipa: idEchipa}});
    return 'updated';
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = {
  getEchipaById,
  updateEchipa,
};
