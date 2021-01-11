const NodeCache = require('node-cache');
const myCache = new NodeCache();
const dalEchipe = require('../dataLayer/dalEchipe');
const dalLigi = require('../dataLayer/dalLigi');
const dalJucatori = require('../dataLayer/dalJucatori');

const addEchipa = async (body) => {
  if (
    !body.nume.trim().length ||
    !body.idLiga ||
    isNaN(body.buget) ||
    body.buget <= 0
  ) {
    return 'validation error';
  }

  const leagueResult = await dalLigi.getLigaById(body.idLiga);
  if (leagueResult === 'notFound') {
    return 'league not exists';
  }

  const teamResult = await dalEchipe.getEchipaByName(body.nume);
  if (typeof teamResult !== 'string') {
    if (!teamResult.deleted) {
      return 'team exists';
    } else {
      if (body.idLiga !== teamResult.idLiga) {
        return 'different league';
      }
      // update echipa, deleted: false
      teamResult.deleted = false;
      const resultUpdate = await dalEchipe.updateEchipa(
        teamResult.idEchipa,
        teamResult
      );
      if (resultUpdate !== 'updated') {
        return resultUpdate;
      }
    }
  } else {
    const addResult = await dalEchipe.addTeam(body);
    if (addResult !== 'created') {
      return addResult;
    }
  }
  myCache.del('allTeams');
  return 'success';
};

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
  addEchipa,
  getAllTeams,
  getEchipaById,
};
