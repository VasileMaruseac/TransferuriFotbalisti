const express = require('express');
const router = express.Router();

const controller = require('../controllers/EchipeController');

router.get('/echipe/get/:id', controller.renderGetEchipa);

router.get('/echipe/getAll', controller.renderGetAllEchipe);

router.get('/echipe/add', controller.renderAddEchipa);

router.post('/echipe/add', controller.addEchipa);

router.get('/echipe/update/:id', controller.renderUpdateEchipa);

router.post('/echipe/update/:id', controller.updateEchipa);

router.get('/echipe/delete/:id', controller.deleteEchipa);

module.exports = router;
