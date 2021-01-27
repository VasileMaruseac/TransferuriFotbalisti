const express = require('express');
const router = express.Router();
const bllTransferuri = require('../bussinessLogicLayer/bllTransferuri');

router.post('/addTransfer', async (req, res) => {
  const result = await bllTransferuri.addTransfer(req.body);
  if (result === 'success') {
    res.send('Created');
  } else {
    res.status(400).send(result);
  }
});

router.get('/getTransfers', async (req, res) => {
  const result = await bllTransferuri.getAllTransfers();
  if (result === 'error') {
    res.status(400).send('error');
  } else {
    res.send(result);
  }
});

router.delete('/deleteTransfer/:id', async (req, res) => {
  const result = await bllTransferuri.deleteTransfer(req.params.id);
  if (result === 'success') {
    res.send('Deleted');
  } else {
    res.status(400).send(result);
  }
});

module.exports = router;
