const express = require('express');
const {model} = require('mongoose');
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
var ligi = models.ligi;

exports.renderAddEchipa = async (req, res) => {
  try {
    const l = await ligi.findAll();
    res.render('echipe/add', {title: 'Add team', l: l});
  } catch (err) {
    res.send(err.message);
  }
};

exports.addEchipa = async (req, res) => {
  try {
    try {
      console.log('AICI: ', req.body);
      const s = await echipe.create(req.body).catch('err');
      res.redirect(`/echipe/getAll`);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderGetEchipa = async (req, res) => {
  try {
    const s = await echipe.findAll({where: {idEchipa: req.params.id}});
    if (s[0]) {
      //get liga
      const l = await ligi.findAll({where: {idLiga: s[0].dataValues.idLiga}});
      if (l[0]) {
        s[0].dataValues.idLiga = l[0].dataValues.nume;
        res.render('echipe/get', {title: 'Echipa', s: s[0].dataValues});
      } else {
        res.redirect('http://localhost:3000');
      }
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderGetAllEchipe = async (req, res) => {
  console.log('AICI');
  try {
    const s = await echipe.findAll();
    res.render('echipe/getAll', {title: 'Teams list', s: s});
  } catch (err) {
    res.send(err.message);
  }
};

// exports.renderUpdateLeague = async (req, res) => {
//   try {
//     var s = await ligi.findAll({where: {idLiga: req.params.id}});
//     if (s[0]) {
//       res.render('leagues/update', {title: 'Liga', s: s[0].dataValues});
//     } else {
//       res.redirect('http://localhost:3000');
//     }
//   } catch (err) {
//     res.send(err.message);
//   }
// };

// exports.updateLeague = async (req, res) => {
//   try {
//     try {
//       const s = await ligi
//         .update(req.body, {where: {idLiga: req.params.id}})
//         .catch('err');
//       res.redirect(`/leagues/get/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//       res.send(err.message);
//     }
//   } catch (err) {
//     res.send(err.message);
//   }
// };
