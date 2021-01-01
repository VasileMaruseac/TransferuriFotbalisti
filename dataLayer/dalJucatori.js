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

const getJucatoriByTeamId = async (id) => {
  const jucatori = await models.jucatori;
  const s = await jucatori.findAll({where: {idEchipa: id}});
  if (s[0]) {
    return s;
  } else {
    return 'notFound';
  }
};

const getJucatorById = async (id) => {
  const jucatori = await models.jucatori;
  const s = await jucatori.findAll({where: {idJucator: id}});
  if (s[0]) {
    return s[0].dataValues;
  } else {
    return 'notFound';
  }
};

const updateJucator = async (id, body) => {
  const jucatori = await models.jucatori;
  try {
    await jucatori.update(body, {where: {idJucator: id}});
    return 'updated';
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = {
  getJucatoriByTeamId,
  getJucatorById,
  updateJucator,
};
