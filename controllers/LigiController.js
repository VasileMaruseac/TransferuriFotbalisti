const bllLigi = require('../bussinessLogicLayer/bllLigi');

exports.renderAddLeague = async (req, res) => {
  try {
    res.render('leagues/add', {title: 'Add league'});
  } catch (err) {
    res.send(err.message);
  }
};

exports.addLeague = async (req, res) => {
  const result = await bllLigi.addLiga(req.body);
  if (result === 'success') {
    res.redirect(`/leagues/getAll`);
  } else {
    res.status(400).send(result);
  }
};

exports.renderGetLeague = async (req, res) => {
  try {
    const s = await await bllLigi.getLigaById(req.params.id);
    if (s) {
      res.render('leagues/get', {title: 'League', s: s});
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderGetAllLeagues = async (req, res) => {
  try {
    const s = await bllLigi.getLigi();
    res.render('leagues/getAll', {title: 'Leagues list', s: s});
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderUpdateLeague = async (req, res) => {
  try {
    var s = await bllLigi.getLigaById(req.params.id);
    if (s) {
      res.render('leagues/update', {title: 'Liga', s: s});
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateLeague = async (req, res) => {
  const result = await bllLigi.updateLiga(req.params.id, req.body);
  if (result === 'success') {
    res.redirect(`/leagues/get/${req.params.id}`);
  } else {
    res.status(400).send(result);
  }
};

exports.deleteLeague = async (req, res) => {
  const result = await bllLigi.deleteLiga(req.params.id);
  if (result === 'success') {
    res.redirect(`/leagues/getAll`);
  } else {
    res.status(400).send(result);
  }
};
