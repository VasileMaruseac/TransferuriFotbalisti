const express = require("express")
const router = express.Router()
var Sequelize = require("sequelize");
var initModels = require("../models/init-models").initModels; 

const mysql = {
    dbname: 'proiectppaw',
    user: 'vasi',
    pass: '@DminTest123!',
    options: { dialect: 'mysql', port: 3306 }
  };
var sequelize = new Sequelize(mysql.dbname, mysql.user, mysql.pass, mysql.options);
var models = initModels(sequelize);
var ligi = models.ligi;

// renderAllLeagues = async (req, res) => {
//     const result = await ligi.findAll();
//     return result;
//     // res.send({
//     //   result,
//     //   path: '/getAllLeagues'
//     // });
//   };

// module.exports = {
//   getAllLeagues
// }

exports.renderGetLeague = async (req, res) => {
  console.log("AICI");
  try{
      const s = await ligi.findAll({where: {idLiga: req.params.id}})
      console.log(s[0].dataValues);
      if(s[0]){
          res.render("leagues/get", {title: 'League', s:s[0].dataValues})
      }
      else{
          res.redirect('http://localhost:3000')
      }
  }catch(err){
      res.send(err.message)
  }
}

exports.renderGetAllLeagues = async (req, res) => {
  try{
    const s = await ligi.findAll()
      res.render('leagues/getAll', {title: 'Leagues list', s:s})
  }catch(err){
      res.send(err.message)
  }
}