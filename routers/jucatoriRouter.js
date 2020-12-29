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
const echipe = models.echipe;

router.post('/createJucator', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    req.body.deleted = false;
    const s = await jucatori.create(req.body).catch('err');
    res.send('Created');
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/getJucatori', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    const result = [];
    const s = await jucatori.findAll();
    const objEchipe = {};
    for (let i = 0; i < s.length; i++) {
      const jucatorCurent = s[i].dataValues;
      if (!jucatorCurent.deleted) {
        if (!objEchipe[jucatorCurent.idEchipa]) {
          const e = await echipe.findAll({
            where: {idEchipa: jucatorCurent.idEchipa},
          });
          objEchipe[jucatorCurent.idEchipa] = e[0].dataValues.nume;
        }
        jucatorCurent.numeEchipa = objEchipe[jucatorCurent.idEchipa];
        result.push(s[i]);
      }
    }
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/getJucator/:id', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    const s = await jucatori.findAll({where: {idJucator: req.params.id}});
    if (s[0]) {
      let result = s[0].dataValues;
      const e = await echipe.findAll({where: {idEchipa: result.idEchipa}});
      result.numeEchipa = e[0].nume;

      res.send(result);
    } else {
      res.status(404).send('Not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
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

router.delete('/deleteJucator/:id', async (req, res) => {
  try {
    var jucatori = await models.jucatori;
    const s = await jucatori.findAll({where: {idJucator: req.params.id}});
    const jucator = s[0].dataValues;
    jucator.deleted = true;
    await jucatori.update(jucator, {
      where: {idJucator: req.params.id},
    });
    res.send('Deleted');
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

module.exports = router;
