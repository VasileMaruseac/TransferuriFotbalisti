const express = require('express');
const router = express.Router();
const bllLigi = require('../bussinessLogicLayer/bllLigi');

router.post('/createLiga', async (req, res) => {
  const result = await bllLigi.addLiga(req.body);
  if (result === 'success') {
    res.send('Created');
  } else {
    res.status(400).send(result);
  }
});

router.get('/getLigi', async (req, res) => {
  const result = await bllLigi.getLigi();
  if (result === 'error') {
    res.status(400).send('error');
  } else {
    res.send(result);
  }
});

router.get('/getLiga/:id', async (req, res) => {
  const result = await bllLigi.getLigaById(req.params.id);
  if (result === 'error') {
    res.status(400).send('error');
  } else {
    res.send(result);
  }
});

router.post('/updateLiga/:id', async (req, res) => {
  const result = await bllLigi.updateLiga(req.params.id, req.body);
  if (result === 'success') {
    res.send('Updated');
  } else {
    res.status(400).send(result);
  }
});

router.delete('/deleteLiga/:id', async (req, res) => {
  const result = await bllLigi.deleteLiga(req.params.id);
  if (result === 'success') {
    res.send('Deleted');
  } else {
    res.status(400).send(result);
  }
});
module.exports = router;
