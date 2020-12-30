const NodeCache = require("node-cache");
const myCache = new NodeCache();
const dalLigi = require("../dataLayer/dalLigi");
const dalEchipe = require("../dataLayer/dalEchipe");

const addLiga = async (body) => {
  if (!body.nume.trim().length || !body.tara.trim().length) {
    return "validation error";
  }
  const leagueResult = await dalLigi.getLigaByName(body.nume);
  if (typeof leagueResult !== "string") {
    if (!leagueResult.deleted) {
      return "league exists";
    } else {
      if (body.tara !== leagueResult.tara) {
        return "different country";
      }
      // update liga, deleted: false
      leagueResult.deleted = false;
      const resultUpdate = await dalLigi.updateLiga(
        leagueResult.idLiga,
        leagueResult
      );
      if (resultUpdate !== "updated") {
        return resultUpdate;
      }
    }
  } else {
    const addResult = await dalLigi.addLeague(body);
    if (addResult !== "created") {
      return addResult;
    }
  }

  myCache.del("allLeagues");
  return "success";
};

const getLigi = async () => {
  const getFromCache = myCache.get("allLeagues");
  if (getFromCache) {
    console.log("FROM CACHE");
    return getFromCache;
  }

  result = await dalLigi.getAllLeagues();
  myCache.set("allLeagues", result);
  console.log("FROM DB");
  return result;
};

const getLigaById = async (id) => {
  const getFromCache = myCache.get(`league_${id}`);
  if (getFromCache) {
    console.log("FROM CACHE");
    return getFromCache;
  }

  result = await dalLigi.getLigaById(id);
  echipe = await dalEchipe.getEchipeByLeagueId(id);
  result.echipe = [];
  for (let i = 0; i < echipe.length; i++) {
    result.echipe.push(echipe[i].dataValues);
  }
  myCache.set(`league_${id}`, result);
  console.log("FROM DB");
  return result;
};

const bllUpdateLiga = async (id, body) => {};

module.exports = {
  addLiga,
  getLigi,
  getLigaById,
  bllUpdateLiga,
};
