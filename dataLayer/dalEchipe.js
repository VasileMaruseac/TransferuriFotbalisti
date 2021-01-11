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

const addTeam = async (body) => {
  body.deleted = false;
  try {
    await echipe.create(body);
    return 'created';
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const getAllEchipe = async () => {
  try {
    const result = await echipe.findAll();
    const teams = [];
    for (let i = 0; i < result.length; i++) {
      if (!result[i].dataValues.deleted) {
        teams.push(result[i]);
      }
    }
    return teams;
  } catch (err) {
    return 'error';
  }
};

const getEchipaById = async (id) => {
  const s = await echipe.findAll({where: {idEchipa: id}});
  if (s[0]) {
    return s[0].dataValues;
  } else {
    return 'notFound';
  }
};

const getEchipaByName = async (nume) => {
  const s = await echipe.findAll({where: {nume}});
  if (s[0]) {
    return s[0].dataValues;
  } else {
    return 'notFound';
  }
};

const getEchipeByLeagueId = async (id) => {
  const s = await echipe.findAll({where: {idLiga: id}});
  if (s[0]) {
    return s;
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
  addTeam,
  getEchipaByName,
  getAllEchipe,
  getEchipaById,
  getEchipeByLeagueId,
  updateEchipa,
};
