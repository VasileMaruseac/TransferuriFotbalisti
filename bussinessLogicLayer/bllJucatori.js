const {body} = require('express-validator');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const dalEchipe = require('../dataLayer/dalEchipe');
const dalJucatori = require('../dataLayer/dalJucatori');

const addJucator = async (body) => {
  if (
    !body.nume.trim().length ||
    !body.nationalitate.trim().length ||
    !body.idEchipa ||
    !body.dataNastere ||
    isNaN(body.valoare) ||
    body.valoare <= 0
  ) {
    return 'validation error';
  }
  const teamResult = await dalEchipe.getEchipaById(body.idEchipa);
  if (teamResult === 'notFound') {
    return 'team not exists';
  }
  const playerResult = await dalJucatori.getJucatorByName(body.nume);
  if (typeof playerResult !== 'string') {
    if (!playerResult.deleted) {
      return 'player exists';
    } else {
      if (body.idEchipa != playerResult.idEchipa) {
        return 'different team';
      }
      // update jucator, deleted: false
      playerResult.deleted = false;
      const resultUpdate = await dalJucatori.updateJucator(
        playerResult.idJucator,
        playerResult
      );
      if (resultUpdate !== 'updated') {
        return resultUpdate;
      }
    }
  } else {
    const addResult = await dalJucatori.addJucator(body);
    if (addResult !== 'created') {
      return addResult;
    }
  }
  myCache.del('allPlayers', `player_${body.idJucator}`);
  return 'success';
};

const getAllPlayers = async (body) => {
  const getFromCache = myCache.get('allPlayers');
  if (getFromCache) {
    console.log('FROM CACHE');
    return getFromCache;
  }

  const result = [];
  const s = await dalJucatori.getAllJucatori();
  const objEchipe = {};
  for (let i = 0; i < s.length; i++) {
    const jucatorCurent = s[i].dataValues;
    if (!objEchipe[jucatorCurent.idEchipa]) {
      const e = await dalEchipe.getEchipaById(jucatorCurent.idEchipa);
      objEchipe[jucatorCurent.idEchipa] = e.nume;
    }
    jucatorCurent.numeEchipa = objEchipe[jucatorCurent.idEchipa];
    result.push(s[i]);
  }

  myCache.set('allPlayers', result);
  console.log('FROM DB');
  return result;
};

const getJucatorById = async (id) => {
  const getFromCache = myCache.get(`player_${id}`);
  if (getFromCache) {
    console.log('FROM CACHE');
    return getFromCache;
  }

  result = await dalJucatori.getJucatorById(id);
  echipa = await dalEchipe.getEchipaById(result.idEchipa);
  result.numeEchipa = echipa.nume;
  myCache.set(`player_${id}`, result);
  console.log('FROM DB');
  return result;
};

const updateJucator = async (id, body) => {
  if (
    !body.nume.trim().length ||
    !body.nationalitate.trim().length ||
    !body.idEchipa ||
    !body.dataNastere ||
    isNaN(body.valoare) ||
    body.valoare <= 0
  ) {
    return 'validation error';
  }
  const jucator = await dalJucatori.getJucatorById(id);
  if (typeof jucator === 'string') {
    return 'not exists';
  }
  if (jucator.nume != body.nume) {
    const playerResult = await dalJucatori.getJucatorByName(body.nume);
    if (typeof playerResult !== 'string') {
      return 'exista deja o echipa cu acest nume';
    }
  }
  const resultUpdate = await dalJucatori.updateJucator(id, body);
  if (resultUpdate !== 'updated') {
    return resultUpdate;
  }
  myCache.del([
    'allPlayers',
    `player_${id}`,
    `team_${jucator.idEchipa}`,
    `team_${body.idEchipa}`,
  ]);
  return 'success';
};

const deleteJucator = async (id) => {
  const jucator = await dalJucatori.getJucatorById(id);
  if (typeof jucator === 'string') {
    return 'not exists';
  }
  jucator.deleted = true;
  const resultUpdate = await dalJucatori.updateJucator(id, jucator);
  if (resultUpdate !== 'updated') {
    return resultUpdate;
  }
  myCache.del(['allPlayers', `player_${id}`, `team_${jucator.idEchipa}`]);
  return 'success';
};

module.exports = {
  addJucator,
  getAllPlayers,
  getJucatorById,
  updateJucator,
  deleteJucator,
};
