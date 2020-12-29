const dalJucatori = require('../dataLayer/dalJucatori');
const dalEchipe = require('../dataLayer/dalEchipe');
const dalTransferuri = require('../dataLayer/dalTransferuri');

const addTransfer = async ({idJucator, idEchipaNoua, pret}) => {
  if (!idJucator || !!idEchipaNoua || isNaN(pret) || pret <= 0) {
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

module.exports = {
  addTransfer,
};
