const express = require('express');
const router = express.Router();
const bllJucatori = require('../bussinessLogicLayer/bllJucatori');

router.post('/createJucator', async (req, res) => {
  const result = await bllJucatori.addJucator(req.body);
  if (result === 'success') {
    res.send('Created');
  } else {
    res.status(400).send(result);
  }
});

router.get('/getJucatori', async (req, res) => {
  const result = await bllJucatori.getAllPlayers();
  if (result === 'error') {
    res.status(400).send('error');
  } else {
    res.send(result);
  }
});

router.get('/getJucator/:id', async (req, res) => {
  const result = await bllJucatori.getJucatorById(req.params.id);
  if (result === 'error') {
    res.status(400).send('error');
  } else {
    res.send(result);
  }
});

router.post('/updateJucator/:id', async (req, res) => {
  try {
    const result = await bllJucatori.updateJucator(req.params.id, req.body);
    if (result === 'success') {
      res.send('Updated');
    } else {
      res.status(400).send(result);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.delete('/deleteJucator/:id', async (req, res) => {
  const result = await bllJucatori.deleteJucator(req.params.id);
  if (result === 'success') {
    res.send('Deleted');
  } else {
    res.status(400).send(result);
  }
});

module.exports = router;
