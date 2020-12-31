const express = require('express');
const router = express.Router();

const controller = require('../controllers/LigiController');

router.get('/leagues/get/:id', controller.renderGetLeague);

router.get('/leagues/getAll', controller.renderGetAllLeagues);

router.get('/leagues/add', controller.renderAddLeague);

router.post('/leagues/add', controller.addLeague);

router.get('/leagues/update/:id', controller.renderUpdateLeague);

router.post('/leagues/update/:id', controller.updateLeague);

router.get('/leagues/delete/:id', controller.deleteLeague);

module.exports = router;
