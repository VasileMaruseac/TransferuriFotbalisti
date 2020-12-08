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
  try {
    const s = await echipe.findAll();
    res.render('echipe/getAll', {title: 'Teams list', s: s});
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderUpdateEchipa = async (req, res) => {
  try {
    var s = await echipe.findAll({where: {idEchipa: req.params.id}});
    const l = await ligi.findAll();
    if (s[0]) {
      res.render('echipe/update', {title: 'Echipa', s: s[0].dataValues, l: l});
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateEchipa = async (req, res) => {
  try {
    try {
      const s = await echipe
        .update(req.body, {where: {idEchipa: req.params.id}})
        .catch('err');
      res.redirect(`/echipe/get/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.deleteEchipa = async (req, res) => {
  try {
    try {
      var s = await echipe.findAll({where: {idEchipa: req.params.id}});
      let idLiga;
      if (s[0]) {
        idLiga = s[0].dataValues.idLiga;
        //get liga
        const l = await ligi.findAll({where: {idLiga: idLiga}});
        if (l[0]) {
          await l[0].update(
            {lastUpdatedTime: new Date().getTime()},
            {where: {idLiga: idLiga}}
          );
        }
        await s[0].destroy();
        if (idLiga) {
          res.redirect('/leagues/get/' + idLiga);
        } else {
          res.redirect('/leagues/getAll');
        }
      } else {
        res.redirect('http://localhost:3000');
      }
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  } catch (err) {
    res.send(err.message);
  }
};
