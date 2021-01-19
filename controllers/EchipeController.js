const bllLigi = require('../bussinessLogicLayer/bllLigi');
const bllEchipe = require('../bussinessLogicLayer/bllEchipe');

exports.renderAddEchipa = async (req, res) => {
  try {
    const l = await bllLigi.getLigi();
    res.render('echipe/add', {title: 'Add team', l: l});
  } catch (err) {
    res.send(err.message);
  }
};

exports.addEchipa = async (req, res) => {
  const result = await bllEchipe.addEchipa(req.body);
  if (result === 'success') {
    res.redirect(`/echipe/getAll`);
  } else {
    res.status(400).send(result);
  }
};

exports.renderGetEchipa = async (req, res) => {
  try {
    const s = await bllEchipe.getEchipaById(req.params.id);
    if (s) {
      res.render('echipe/get', {title: 'Team', s: s});
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderGetAllEchipe = async (req, res) => {
  try {
    const s = await bllEchipe.getAllTeams();
    res.render('echipe/getAll', {title: 'Teams list', s: s});
  } catch (err) {
    res.send(err.message);
  }
};

exports.renderUpdateEchipa = async (req, res) => {
  try {
    const s = await bllEchipe.getEchipaById(req.params.id);
    const l = await bllLigi.getLigi();
    if (s) {
      res.render('echipe/update', {title: 'Echipa', s: s, l: l});
    } else {
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateEchipa = async (req, res) => {
  const result = await bllEchipe.updateEchipa(req.params.id, req.body);
  if (result === 'success') {
    res.redirect(`/echipe/get/${req.params.id}`);
  } else {
    res.status(400).send(result);
  }
};

exports.deleteEchipa = async (req, res) => {
  const result = await bllEchipe.deleteEchipa(req.params.id);
  if (result === 'success') {
    res.redirect(`/echipe/getAll`);
  } else {
    res.status(400).send(result);
  }
};
