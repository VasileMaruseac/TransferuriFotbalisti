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
var ligi = models.ligi;
var echipe = models.echipe;

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
      res.redirect(`/leagues/getAll`);
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
    const l = await echipe.findAll({where: {idLiga: req.params.id}});
    if (s[0]) {
      res.render('leagues/get', {title: 'League', s: s[0].dataValues, l: l});
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
      res.redirect(`/leagues/get/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  } catch (err) {
    res.send(err.message);
  }
};

// exports.deleteLeague = async (req, res) => {

// }
