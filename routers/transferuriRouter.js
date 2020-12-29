const express = require('express');
const router = express.Router();
var Sequelize = require('sequelize');
var initModels = require('../models/init-models').initModels;
const bllTransferuri = require('../bussinessLogicLayer/bllTransferuri');

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
var echipe = models.echipe;

router.post('/addTransfer', async (req, res) => {
  const result = await bllTransferuri.addTransfer(req.body);
  if (result === 'success') {
    res.send('Created');
  } else {
    res.status(400).send(result);
  }
});

router.get('/getTransfers', async (req, res) => {
  try {
    const objPers = {};
    const objEchipe = {};

    var transferuri = await models.transferuri;
    var jucatori = await models.jucatori;
    const t = await transferuri.findAll();
    for (let i = 0; i < t.length; i++) {
      const idJucator = t[i].dataValues.idJucator;
      const idEchipaVeche = t[i].dataValues.idEchipaVeche;
      const idEchipaNoua = t[i].dataValues.idEchipaNoua;
      if (!objPers[idJucator]) {
        const j = await jucatori.findAll({
          where: {idJucator: idJucator},
        });
        objPers[idJucator] = j[0].dataValues.nume;
      }
      t[i].dataValues.numeJucator = objPers[idJucator];

      if (!objEchipe[idEchipaVeche]) {
        const e = await echipe.findAll({
          where: {idEchipa: idEchipaVeche},
        });
        objEchipe[idEchipaVeche] = e[0].dataValues.nume;
      }
      t[i].dataValues.numeEchipaVeche = objEchipe[idEchipaVeche];

      if (!objEchipe[idEchipaNoua]) {
        const e = await echipe.findAll({
          where: {idEchipa: idEchipaNoua},
        });
        objEchipe[idEchipaNoua] = e[0].dataValues.nume;
      }
      t[i].dataValues.numeEchipaNoua = objEchipe[idEchipaNoua];
    }
    res.send(t);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete('/deleteTransfer/:id', async (req, res) => {
  try {
    var transferuri = await models.transferuri;
    await transferuri.destroy({where: {idTransfer: req.params.id}});
    res.send('Deleted');
  } catch (err) {
    res.send(err.message);
  }
});

// router.get('/getJucatori', async (req, res) => {
//   try {
//     var jucatori = await models.jucatori;
//     const s = await jucatori.findAll();
//     res.send(s);
//   } catch (err) {
//     res.send(err.message);
//   }
// });

// router.get('/getJucator/:id', async (req, res) => {
//   try {
//     var jucatori = await models.jucatori;
//     const x = req.body;
//     const s = await jucatori.findAll({where: x});
//     res.send(s);
//   } catch (err) {
//     res.send(err.message);
//   }
// });

// router.post('/updateJucator/:id', async (req, res) => {
//   try {
//     var jucatori = await models.jucatori;
//     const s = await jucatori
//       .update(req.body, {where: {idJucator: req.params.id}})
//       .catch('err');
//     res.send('Updated');
//   } catch (err) {
//     console.log(err);
//     res.send(err.message);
//   }
// });

module.exports = router;
