const express = require("express")
const router = express.Router()

const controller = require("../controllers/LigiController");

router.get("/leagues/get/:id", controller.renderGetLeague)

router.get("/leagues/getAll", controller.renderGetAllLeagues)

module.exports = router