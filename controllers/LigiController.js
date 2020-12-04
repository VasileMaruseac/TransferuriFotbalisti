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
var ligi = models.ligi;

exports.renderAddLeague = async (req, res) => {
  try {
    res.render('leagues/add', {title: 'Add league'});
  } catch (err) {
    res.send(err.message);
  }
};

exports.addLeague = async (req, res) => {
  try {
    try {
      const s = await ligi.create(req.body).catch('err');
      res.send('Created');
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderGetLeague = async (req, res) => {
  try {
    const s = await ligi.findAll({where: {idLiga: req.params.id}});
    if (s[0]) {
      res.render('leagues/get', {title: 'League', s: s[0].dataValues});
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderGetAllLeagues = async (req, res) => {
  try {
    const s = await ligi.findAll();
    res.render('leagues/getAll', {title: 'Leagues list', s: s});
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderUpdateLeague = async (req, res) => {
  try {
    var s = await ligi.findAll({where: {idLiga: req.params.id}});
    if (s[0]) {
      res.render('leagues/update', {title: 'Liga', s: s[0].dataValues});
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateLeague = async (req, res) => {
  try {
    try {
      const s = await ligi
        .update(req.body, {where: {idLiga: req.params.id}})
        .catch('err');
      res.send('Updated');
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  } catch (err) {
    res.send(err.message);
  }
};
