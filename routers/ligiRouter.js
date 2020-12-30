const express = require("express");
const router = express.Router();
var Sequelize = require("sequelize");
var initModels = require("../models/init-models").initModels;
const bllLigi = require("../bussinessLogicLayer/bllLigi");

const mysql = {
  dbname: "proiectppaw",
  user: "vasi",
  pass: "@DminTest123!",
  options: { dialect: "mysql", port: 3306 },
};
var sequelize = new Sequelize(
  mysql.dbname,
  mysql.user,
  mysql.pass,
  mysql.options
);

var models = initModels(sequelize);
var ligi = models.ligi;

router.post("/createLiga", async (req, res) => {
  const result = await bllLigi.addLiga(req.body);
  if (result === "success") {
    res.send("Created");
  } else {
    res.status(400).send(result);
  }
});

router.get("/getLigi", async (req, res) => {
  const result = await bllLigi.getLigi();
  if (result === "error") {
    res.status(400).send("error");
  } else {
    res.send(result);
  }
});

router.get("/getLiga/:id", async (req, res) => {
  const result = await bllLigi.getLigaById(req.params.id);
  if (result === "error") {
    res.status(400).send("error");
  } else {
    res.send(result);
  }
});

router.post("/updateLiga/:id", async (req, res) => {
  try {
    const s = await ligi
      .update(req.body, { where: { idLiga: req.params.id } })
      .catch("err");
    res.send("Updated");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

module.exports = router;
