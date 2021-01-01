const NodeCache = require('node-cache');
const myCache = new NodeCache();
const dalEchipe = require('../dataLayer/dalEchipe');
const dalLigi = require('../dataLayer/dalLigi');
const dalJucatori = require('../dataLayer/dalJucatori');

const getAllTeams = async () => {
  const getFromCache = myCache.get('allTeams');
  if (getFromCache) {
    console.log('FROM CACHE');
    return getFromCache;
  }

  result = await dalEchipe.getAllEchipe();
  myCache.set('allTeams', result);
  console.log('FROM DB');
  return result;
};

const getEchipaById = async (id) => {
  const getFromCache = myCache.get(`team_${id}`);
  if (getFromCache) {
    console.log('FROM CACHE');
    return getFromCache;
  }

  result = await dalEchipe.getEchipaById(id);
  liga = await dalLigi.getLigaById(result.idLiga);
  result.numeLiga = liga.nume;
  console.log(result);
  jucatori = await dalJucatori.getJucatoriByTeamId(id);
  result.jucatori = [];
  for (let i = 0; i < jucatori.length; i++) {
    if (!jucatori[i].dataValues.deleted) {
      result.jucatori.push(jucatori[i].dataValues);
    }
  }
  myCache.set(`team_${id}`, result);
  console.log('FROM DB');
  return result;
};

module.exports = {
  getAllTeams,
  getEchipaById,
};
