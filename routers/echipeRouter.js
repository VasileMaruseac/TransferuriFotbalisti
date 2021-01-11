const express = require('express');
const router = express.Router();
const bllEchipe = require('../bussinessLogicLayer/bllEchipe');

router.post('/createEchipa', async (req, res) => {
  const result = await bllEchipe.addEchipa(req.body);
  if (result === 'success') {
    res.send('Created');
  } else {
    res.status(400).send(result);
  }
});

router.get('/getEchipe', async (req, res) => {
  const result = await bllEchipe.getAllTeams();
  if (result === 'error') {
    res.status(400).send('error');
  } else {
    res.send(result);
  }
});

router.get('/getEchipa/:id', async (req, res) => {
  const result = await bllEchipe.getEchipaById(req.params.id);
  if (result === 'error') {
    res.status(400).send('error');
  } else {
    res.send(result);
  }
});

//   router.post('/updateLiga/:id', async (req, res) => {
//     try {
//       const s = await ligi
//         .update(req.body, {where: {idLiga: req.params.id}})
//         .catch('err');
//       res.send('Updated');
//     } catch (err) {
//       res.send(err.message);
//     }
//   });

module.exports = router;
