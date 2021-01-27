const dalJucatori = require('../dataLayer/dalJucatori');
const dalEchipe = require('../dataLayer/dalEchipe');
const dalTransferuri = require('../dataLayer/dalTransferuri');
const NodeCache = require('node-cache');
const myCache = new NodeCache();

const addTransfer = async ({idJucator, idEchipaNoua, pret}) => {
  if (!idJucator || !idEchipaNoua || isNaN(pret) || pret <= 0) {
    return 'validation error';
  }
  const jucator = await dalJucatori.getJucatorById(idJucator);
  if (typeof jucator === 'string' || jucator.deleted) {
    return 'jucator not found';
  }
  if (jucator.idEchipa == idEchipaNoua) {
    return 'aceeasi echipa';
  }
  if (pret < 0.7 * jucator.valoare) {
    return 'pret prea mic';
  }
  const echipaVeche = await dalEchipe.getEchipaById(jucator.idEchipa);
  if (typeof echipaVeche === 'string' || echipaVeche.deleted) {
    return 'echipa not found';
  }
  const echipaNoua = await dalEchipe.getEchipaById(idEchipaNoua);
  if (typeof echipaNoua === 'string' || echipaNoua.deleted) {
    return 'echipa not found';
  }
  if (echipaNoua.buget < pret) {
    return 'buget insuficient';
  }
  let resultUpdate;
  echipaVeche.buget += pret;
  resultUpdate = await dalEchipe.updateEchipa(
    echipaVeche.idEchipa,
    echipaVeche
  );
  if (resultUpdate !== 'updated') {
    return 'eroare update';
  }

  echipaNoua.buget -= pret;
  resultUpdate = await dalEchipe.updateEchipa(idEchipaNoua, echipaNoua);
  if (resultUpdate !== 'updated') {
    return 'eroare update';
  }

  jucator.idEchipa = idEchipaNoua;
  resultUpdate = await dalJucatori.updateJucator(idJucator, jucator);
  if (resultUpdate !== 'updated') {
    return 'eroare update';
  }

  const transfer = {
    idJucator,
    idEchipaVeche: echipaVeche.idEchipa,
    idEchipaNoua,
    pret,
  };
  const resultCreate = await dalTransferuri.addTransfer(transfer);
  if (resultCreate !== 'created') {
    return 'eroare create';
  }

  return 'success';
};

const getAllTransfers = async (body) => {
  const getFromCache = myCache.get('allTransfers');
  if (getFromCache) {
    console.log('FROM CACHE');
    return getFromCache;
  }
  const result = [];
  const t = await dalTransferuri.getAllTransfers();
  const objPers = {};
  const objEchipe = {};
  for (let i = 0; i < t.length; i++) {
    const transferCurent = t[i].dataValues;
    const idJucator = transferCurent.idJucator;
    const idEchipaVeche = transferCurent.idEchipaVeche;
    const idEchipaNoua = transferCurent.idEchipaNoua;
    if (!objPers[idJucator]) {
      const j = await dalJucatori.getJucatorById(idJucator);
      objPers[idJucator] = j.nume;
    }
    transferCurent.numeJucator = objPers[idJucator];

    if (!objEchipe[idEchipaVeche]) {
      const e = await dalEchipe.getEchipaById(idEchipaVeche);
      objEchipe[idEchipaVeche] = e.nume;
    }
    transferCurent.numeEchipaVeche = objEchipe[idEchipaVeche];

    if (!objEchipe[idEchipaNoua]) {
      const e = await dalEchipe.getEchipaById(idEchipaNoua);
      objEchipe[idEchipaNoua] = e.nume;
    }
    transferCurent.numeEchipaNoua = objEchipe[idEchipaNoua];

    result.push(transferCurent);
  }
  myCache.set('allTransfers', result);
  console.log('FROM DB');
  return result;
};

const deleteTransfer = async (id) => {
  await dalTransferuri.deleteTransfer(id);
  myCache.del(['allTransfers']);
  return 'success';
};

module.exports = {
  addTransfer,
  getAllTransfers,
  deleteTransfer,
};
