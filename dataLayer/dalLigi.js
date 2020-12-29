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
var ligi = models.ligi;

const addLeague = async (body) => {
  body.lastUpdatedTime = new Date().getTime();
  body.deleted = false;
  try {
    await ligi.create(body);
    return 'created';
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const getLigaByName = async (name) => {
  const s = await ligi.findAll({where: {nume: name}});
  if (s[0]) {
    return s[0].dataValues;
  } else {
    return 'notFound';
  }
};

const updateLiga = async (id, body) => {
  try {
    await ligi.update(body, {where: {idLiga: id}});
    return 'updated';
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = {
  addLeague,
  getLigaByName,
  updateLiga,
};
