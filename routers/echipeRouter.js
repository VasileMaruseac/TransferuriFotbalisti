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
var echipe = models.echipe;

// router.post('/createLiga', async (req, res) => {
//     try {
//       const s = await ligi.create(req.body).catch('err');
//       res.send('Created');
//     } catch (err) {
//       res.send(err.message);
//     }
//   });

router.get('/getEchipe', async (req, res) => {
  try {
    const s = await echipe.findAll();
    res.send(s);
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/getEchipa', async (req, res) => {
  try {
    const x = req.body;
    const s = await echipe.findAll({idEchipa: req.params.id});
    res.send(s);
  } catch (err) {
    res.send(err.message);
  }
});

//   router.post('/updateLiga/:id', async (req, res) => {
//     try {
//       const s = await ligi
//         .update(req.body, {where: {idLiga: req.params.id}})
//         .catch('err');
//       res.send('Updated');
//     } catch (err) {
//       console.log(err);
//       res.send(err.message);
//     }
//   });

module.exports = router;