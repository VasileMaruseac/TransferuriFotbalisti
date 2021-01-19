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

router.post('/updateEchipa/:id', async (req, res) => {
  try {
    const result = await bllEchipe.updateEchipa(req.params.id, req.body);
    if (result === 'success') {
      res.send('Updated');
    } else {
      res.status(400).send(result);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.delete('/deleteEchipa/:id', async (req, res) => {
  const result = await bllEchipe.deleteEchipa(req.params.id);
  if (result === 'success') {
    res.send('Deleted');
  } else {
    res.status(400).send(result);
  }
});

module.exports = router;
