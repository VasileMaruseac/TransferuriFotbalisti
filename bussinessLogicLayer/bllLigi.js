const dalLigi = require('../dataLayer/dalLigi');

const addLiga = async (body) => {
  if (!body.nume.trim().length || !body.tara.trim().length) {
    return 'validation error';
  }
  const leagueResult = await dalLigi.getLigaByName(body.nume);
  if (typeof leagueResult !== 'string') {
    if (!leagueResult.deleted) {
      return 'league exists';
    } else {
      if (body.tara !== leagueResult.tara) {
        return 'different country';
      }
      // update liga, deleted: false
      leagueResult.deleted = false;
      const resultUpdate = await dalLigi.updateLiga(
        leagueResult.idLiga,
        leagueResult
      );
      if (resultUpdate !== 'updated') {
        return resultUpdate;
      }
    }
  } else {
    const addResult = await dalLigi.addLeague(body);
    if (addResult !== 'created') {
      return addResult;
    }
  }

  return 'success';
};

module.exports = {
  addLiga,
};
