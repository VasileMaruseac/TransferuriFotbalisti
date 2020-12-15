const express = require('express');
const router = express.Router();
var Sequelize = require('sequelize');
var initModels = require('../models/init-models').initModels;

const mysql = {
  dbname: 'proiectppaw',
  user: 'vasi',
  pass: '@DminTest123!',
  options: {dialect: 'mysql', port: 3306},
};
var sequelize = new Sequelize(
  mysql.dbname,
  mysql.user,
  mysql.pass,
  mysql.options
);

var models = initModels(sequelize);

router.post('/createJucator', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    console.log(models);
    console.log(models.echipe);
    console.log(jucatori);
    const s = await jucatori.create(req.body).catch('err');
    res.send('Created');
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/getJucatori', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    const s = await jucatori.findAll();
    res.send(s);
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/getJucator/:id', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    const x = req.body;
    const s = await jucatori.findAll({where: x});
    res.send(s);
  } catch (err) {
    res.send(err.message);
  }
});

router.post('/updateJucator/:id', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    const s = await jucatori
      .update(req.body, {where: {idJucator: req.params.id}})
      .catch('err');
    res.send('Updated');
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

module.exports = router;
