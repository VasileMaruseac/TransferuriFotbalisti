// a shortcut for html element (dom = document object model)
const dom = (id) => document.getElementById(id);

const addEntityServer = (body, route) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', route);
    // the request will send json, UTF8 data
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
      resolve({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    // transmit the object converted to JSON
    xhr.send(JSON.stringify(body));
    // every time when a change in HTTP request status occures
    xhr.onreadystatechange = function () {
      // if HTTP request is DONE
      if (xhr.readyState === 4) {
        // if status is ok
        if (xhr.status === 200) {
          dom('message').innerHTML = 'Success. Entity saved.';
          resolve({
            status: this.status,
            statusText: xhr.statusText,
          });
          // if status is not ok
          // display error message and the response from server
        } else {
          dom('message').innerHTML =
            'Error. Entity not saved. ' + xhr.responseText;
        }
      }
    };
  });
};

const getAllEntitiesServer = (route) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', route);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          items: JSON.parse(xhr.response),
        });
      } else {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

const getOneEntityServer = (id, route) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', route + id);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          item: JSON.parse(xhr.response),
        });
      } else {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

const updateEntityServer = (id, body, route) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', route + id);
    // the request will send json, UTF8 data
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
      resolve({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    // transmit the object converted to JSON
    xhr.send(JSON.stringify(body));
    // every time when a change in HTTP request status occures
    xhr.onreadystatechange = function () {
      // if HTTP request is DONE
      if (xhr.readyState === 4) {
        // if status is ok
        if (xhr.status === 200) {
          dom('message').innerHTML = 'Success. Item actualizat.';
          resolve();
          // if status is not ok
          // display error message and the response from server
        } else {
          dom('message').innerHTML = 'Error. ' + xhr.responseText;
        }
      }
    };
  });
};

const deleteEntityServer = (id, route) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', route + id);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
        });
      } else {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

//#region ligi
//#region addLeague
const addLeague = async () => {
  const nume = dom('nume').value;
  const tara = dom('tara').value;
  body = {
    nume,
    tara,
  };

  const result = await addEntityServer(body, '/createLiga');
  if (result.status === 200) {
    window.location.href = '../html/leaguesList.html';
  }
};
//#endregion

//#region allLeagues
const allLeaguesLoad = async () => {
  data = await getAllEntitiesServer('/getLigi');
  if (data.status == 200) {
    let table = dom('leagues');
    const leagues = [...data.items];
    for (let i = 0; i < leagues.length; i++) {
      let tr = document.createElement('tr');
      let td = document.createElement('td');
      let a = document.createElement('a');
      a.href = '../html/leagueInfo.html?id=' + leagues[i].idLiga;
      a.innerHTML = leagues[i].nume;
      const tdDelete = document.createElement('input');
      tdDelete.type = 'button';
      tdDelete.value = 'Delete';
      tdDelete.addEventListener('click', function () {
        deleteLiga(leagues[i].idLiga);
      });
      td.appendChild(a);
      tr.appendChild(td);
      tr.appendChild(tdDelete);
      table.appendChild(tr);
    }
  } else {
    alert('No reports');
  }
};

const searchLeagues = () => {
  const searchValue = dom('search').value.toLowerCase();

  const leagues = dom('leagues').childNodes;
  for (let i = 0; i < leagues.length; i++) {
    const leagueName = leagues[i].childNodes[0].innerText.toLowerCase();
    if (leagueName.includes(searchValue)) {
      leagues[i].style.display = '';
    } else {
      leagues[i].style.display = 'none';
    }
  }
};
//#endregion

//#region getOneLeague
const oneLeagueLoad = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  data = await getOneEntityServer(id, '/getLiga/');
  if (data.status == 200) {
    const league = data.item;
    const nume = dom('nume');
    nume.innerHTML += league.nume;
    const tara = dom('tara');
    tara.innerHTML += league.tara;
    const lastUpdatedTime = dom('lastUpdatedTime');
    lastUpdatedTime.innerHTML += new Date(parseInt(league.lastUpdatedTime));
    tableEchipe = dom('echipe');
    league.echipe.forEach((echipa) => {
      const tr = document.createElement('tr');
      const tdNume = document.createElement('td');
      let link = document.createElement('a');
      link.href = '../html/echipaInfo.html?id=' + echipa.idEchipa;
      link.innerHTML = echipa.nume;
      tdNume.appendChild(link);

      let tdDelete = document.createElement('input');
      tdDelete.type = 'button';
      tdDelete.value = 'Delete';
      tdDelete.addEventListener('click', function () {
        deleteEchipa(echipa.idEchipa);
      });

      tr.appendChild(tdNume);
      tr.appendChild(tdDelete);
      tableEchipe.appendChild(tr);
    });
    const linkUpdate = dom('link');
    linkUpdate.href += id;
  } else {
    alert('No league');
  }
};
//#endregion

//#region updateLeague
const populateInputsUpdateLeague = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let league = (await getOneEntityServer(id, '/getLiga/')).item;

  const nume = dom('nume');
  nume.value = league.nume;
  const tara = dom('tara');
  tara.value = league.tara;
};

const updateLeague = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idLiga = parseInt(urlParams.get('id'));

  const nume = dom('nume').value;
  const tara = dom('tara').value;

  body = {
    nume,
    tara,
  };
  await updateEntityServer(idLiga, body, '/updateLiga/');
  window.location.href = '../html/leagueInfo.html?id=' + idLiga;
};
//#endregion

//#region delete Liga
const deleteLiga = async (id) => {
  await deleteEntityServer(id, '/deleteLiga/');
  window.location.href = '../html/leaguesList.html';
};
//#endregion
//#endregion

//#region echipe
//#region addTeam
const populateTeamsDropdown = async () => {
  const ligi = (await getAllEntitiesServer('/getLigi')).items;
  let dropdownLigi = dom('ligi');
  for (let i = 0; i < ligi.length; i++) {
    let option = document.createElement('option');
    option.id = ligi[i].idLiga;
    option.innerHTML = ligi[i].nume;
    dropdownLigi.appendChild(option);
  }
};

const addTeam = async () => {
  const nume = dom('nume').value;
  const l = dom('ligi');
  const idLiga = l.options[l.selectedIndex].id;
  const buget = parseInt(dom('buget').value);

  if (!nume.length || idLiga === 0 || isNaN(buget) || buget <= 0) {
    alert('Something wrong');
  } else {
    body = {
      nume,
      idLiga,
      buget,
    };

    const result = await addEntityServer(body, '/createEchipa');
    if (result.status === 200) {
      window.location.href = '../html/echipeList.html';
    }
  }
};
//#endregion

//#region allTeams
const allTeamsLoad = async () => {
  data = await getAllEntitiesServer('/getEchipe');
  if (data.status == 200) {
    let table = dom('teams');
    const teams = [...data.items];
    for (let i = 0; i < teams.length; i++) {
      let tr = document.createElement('tr');
      let td = document.createElement('td');
      let a = document.createElement('a');
      a.href = '../html/echipaInfo.html?id=' + teams[i].idEchipa;
      a.innerHTML = teams[i].nume;
      const tdDelete = document.createElement('input');
      tdDelete.type = 'button';
      tdDelete.value = 'Delete';
      tdDelete.addEventListener('click', function () {
        deleteEchipa(teams[i].idEchipa);
      });
      td.appendChild(a);
      tr.appendChild(td);
      tr.appendChild(tdDelete);
      table.appendChild(tr);
    }
  } else {
    alert('No teams');
  }
};

const searchTeams = () => {
  const searchValue = dom('search').value.toLowerCase();

  const teams = dom('teams').childNodes;
  for (let i = 0; i < teams.length; i++) {
    const teamName = teams[i].childNodes[0].innerText.toLowerCase();
    if (teamName.includes(searchValue)) {
      teams[i].style.display = '';
    } else {
      teams[i].style.display = 'none';
    }
  }
};
//#endregion

//#region getOneTeam
const oneTeamLoad = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  data = await getOneEntityServer(id, '/getEchipa/');
  if (data.status == 200) {
    const team = data.item;
    const nume = dom('nume');
    nume.innerHTML += team.nume;
    const liga = dom('liga');
    liga.innerHTML += team.numeLiga;
    const buget = dom('buget');
    buget.innerHTML += team.buget;
    tableJucatori = dom('jucatori');
    team.jucatori.forEach((jucator) => {
      const tr = document.createElement('tr');
      const tdNume = document.createElement('td');
      let link = document.createElement('a');
      link.href = '../html/jucatorInfo.html?id=' + jucator.idJucator;
      link.innerHTML = jucator.nume;
      tdNume.appendChild(link);
      let tdDelete = document.createElement('input');
      tdDelete.type = 'button';
      tdDelete.value = 'Delete';
      tdDelete.addEventListener('click', function () {
        deleteJucator(jucator.idJucator);
      });
      tr.appendChild(tdNume);
      tr.appendChild(tdDelete);
      tableJucatori.appendChild(tr);
    });
    const linkUpdate = dom('link');
    linkUpdate.href += id;
  } else {
    alert('No team');
  }
};
//#endregion

//#region edit team
const populateInputsUpdateEchipa = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let echipa = (await getOneEntityServer(id, '/getEchipa/')).item;
  const ligi = (await getAllEntitiesServer('/getLigi')).items;
  let dropdownLigi = dom('ligi');
  for (let i = 0; i < ligi.length; i++) {
    let option = document.createElement('option');
    option.id = ligi[i].idLiga;
    option.innerHTML = ligi[i].nume;
    if (ligi[i].idLiga === echipa.idLiga) {
      option.selected = true;
    }
    dropdownLigi.appendChild(option);
  }
  const nume = dom('nume');
  nume.value = echipa.nume;
  const buget = dom('buget');
  buget.value = echipa.buget;
};

const updateTeam = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idEchipa = parseInt(urlParams.get('id'));

  const e = dom('ligi');
  const idLiga = parseInt(e.options[e.selectedIndex].id);
  const nume = dom('nume').value;
  const buget = dom('buget').value;
  if (!nume.length || idLiga === 0 || isNaN(buget) || buget <= 0) {
    alert('Something wrong');
    window.location.href = '../html/updateEchipa.html?id=' + idEchipa;
  } else {
    body = {
      nume,
      idLiga,
      buget,
    };
    await updateEntityServer(idEchipa, body, '/updateEchipa/');
    window.location.href = '../html/echipaInfo.html?id=' + idEchipa;
  }
};
//#endregion

//#region delete Echipa
const deleteEchipa = async (id) => {
  await deleteEntityServer(id, '/deleteEchipa/');
  window.location.href = '../html/echipeList.html';
};
//#endregion
//#endregion

//#region jucatori
//#region adaugaJucator
const populatePlayersDropdown = async () => {
  const echipe = (await getAllEntitiesServer('/getEchipe')).items;
  let dropdownechipe = dom('echipe');
  for (let i = 0; i < echipe.length; i++) {
    let option = document.createElement('option');
    option.id = echipe[i].idEchipa;
    option.innerHTML = echipe[i].nume;
    dropdownechipe.appendChild(option);
  }
};

const adaugaJucator = async () => {
  const nume = dom('nume').value;
  const nationalitate = dom('nationalitate').value;
  const dataNastere = new Date(dom('dataNastere').value).getTime();
  const e = dom('echipe');
  const idEchipa = parseInt(e.options[e.selectedIndex].id);
  const valoare = dom('valoare').value;

  if (!idEchipa || isNaN(valoare) || parseInt(valoare) <= 0) {
    alert('Something wrong');
  } else {
    body = {
      nume,
      nationalitate,
      dataNastere,
      idEchipa,
      valoare,
    };
    const result = await addEntityServer(body, '/createJucator');
    if (result.status === 200) {
      window.location.href = '../html/jucatoriList.html';
    }
  }
};
//#endregion

//#region allPlayers
allPlayersLoad = async () => {
  data = await getAllEntitiesServer('/getJucatori');
  if (data.status == 200) {
    let table = dom('players');
    const players = [...data.items];
    for (let i = 0; i < players.length; i++) {
      let tr = document.createElement('tr');
      let tdNume = document.createElement('td');
      let link = document.createElement('a');
      link.href = '../html/jucatorInfo.html?id=' + players[i].idJucator;
      link.innerHTML = players[i].nume;
      tdNume.appendChild(link);

      let tdEchipa = document.createElement('td');
      link = document.createElement('a');
      link.href = '../html/echipaInfo.html?id=' + players[i].idEchipa;
      link.innerHTML = players[i].numeEchipa;
      tdEchipa.appendChild(link);

      let tdDelete = document.createElement('input');
      tdDelete.type = 'button';
      tdDelete.value = 'Delete';
      tdDelete.addEventListener('click', function () {
        deleteJucator(players[i].idJucator);
      });

      tr.appendChild(tdNume);
      tr.appendChild(tdEchipa);
      tr.appendChild(tdDelete);
      table.appendChild(tr);
    }
  } else {
    alert('EROARE');
  }
};

const searchPlayer = () => {
  const searchValue = dom('search').value.toLowerCase();

  const players = dom('players').childNodes;
  for (let i = 2; i < players.length; i++) {
    const playerName = players[i].childNodes[0].innerText.toLowerCase();
    if (playerName.includes(searchValue)) {
      players[i].style.display = '';
    } else {
      players[i].style.display = 'none';
    }
  }
};
//#endregion

//#region getOnePlayer
const onePlayerLoad = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let nume = dom('nume');
  let nationalitate = dom('nationalitate');
  let dataNastere = dom('dataNastere');
  let valoare = dom('valoare');
  let echipa = dom('echipa');
  let jucator = (await getOneEntityServer(id, '/getJucator/')).item;
  nume.innerHTML += ' ' + jucator.nume;
  nationalitate.innerHTML += ' ' + jucator.nationalitate;
  echipa.innerHTML += ' ' + jucator.numeEchipa;
  let data = new Date(parseInt(jucator.dataNastere));
  dataNastere.innerHTML +=
    ' ' +
    data.getDate() +
    '/' +
    (data.getMonth() + 1) +
    '/' +
    data.getFullYear();

  valoare.innerHTML += ' ' + jucator.valoare;
  const link = dom('link');
  link.href += id;
};
//#endregion

//#region update Jucator
const populateInputsUpdateJucator = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let jucator = (await getOneEntityServer(id, '/getJucator/')).item;

  const echipe = (await getAllEntitiesServer('/getEchipe')).items;
  let dropdownEchipe = dom('echipe');
  for (let i = 0; i < echipe.length; i++) {
    let option = document.createElement('option');
    option.id = echipe[i].idEchipa;
    option.innerHTML = echipe[i].nume;
    if (echipe[i].idEchipa === jucator.idEchipa) {
      option.selected = true;
    }
    dropdownEchipe.appendChild(option);
  }
  const nume = dom('nume');
  nume.value = jucator.nume;
  const nationalitate = dom('nationalitate');
  nationalitate.value = jucator.nationalitate;
  const valoare = dom('valoare');
  valoare.value = jucator.valoare;
  const date = new Date(parseInt(jucator.dataNastere))
    .toISOString()
    .substring(0, 10);
  const dataNastere = dom('dataNastere');
  dataNastere.value = date;
};

const updateJucator = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idJucator = parseInt(urlParams.get('id'));

  const e = dom('echipe');
  const idEchipa = parseInt(e.options[e.selectedIndex].id);
  const nume = dom('nume').value;
  const nationalitate = dom('nationalitate').value;
  const dataNastere = new Date(dom('dataNastere').value).getTime();
  let valoare = dom('valoare').value;
  if (!idJucator || !idEchipa || isNaN(valoare) || parseInt(valoare) <= 0) {
    alert('Something wrong');
    window.location.href = '../html/updateJucator.html?id=' + idJucator;
  } else {
    body = {
      nume,
      nationalitate,
      dataNastere,
      idEchipa,
      valoare,
    };
    await updateEntityServer(idJucator, body, '/updateJucator/');
    window.location.href = '../html/jucatorInfo.html?id=' + idJucator;
  }
};
//#endregion

//#region delete Jucator
const deleteJucator = async (id) => {
  await deleteEntityServer(id, '/deleteJucator/');
  window.location.href = '../html/jucatoriList.html';
};
//#endregion
//#endregion

//#region transferuri
//#region allTransfers
const allTransfersLoad = async () => {
  data = await getAllEntitiesServer('/getTransfers');
  if (data.status == 200) {
    let table = dom('transfers');
    const transfers = [...data.items];
    for (let i = 0; i < transfers.length; i++) {
      let tr = document.createElement('tr');
      let tdNume = document.createElement('td');
      let tdEchipaVeche = document.createElement('td');
      let tdEchipaNoua = document.createElement('td');
      let tdSuma = document.createElement('td');
      let tdDelete = document.createElement('input');
      tdDelete.type = 'button';
      tdDelete.value = 'Delete';
      tdDelete.addEventListener('click', function () {
        deleteTransfer(transfers[i].idTransfer);
      });

      let link = document.createElement('a');
      link.href = '../html/jucatorInfo.html?id=' + transfers[i].idJucator;
      link.innerHTML = transfers[i].numeJucator;
      tdNume.appendChild(link);

      link = document.createElement('a');
      link.href = '../html/echipaInfo.html?id=' + transfers[i].idEchipaVeche;
      link.innerHTML = transfers[i].numeEchipaVeche;
      tdEchipaVeche.appendChild(link);

      link = document.createElement('a');
      link.href = '../html/echipaInfo.html?id=' + transfers[i].idEchipaNoua;
      link.innerHTML = transfers[i].numeEchipaNoua;
      tdEchipaNoua.appendChild(link);

      tdSuma.innerHTML = transfers[i].pret;
      tr.appendChild(tdNume);
      tr.appendChild(tdEchipaVeche);
      tr.appendChild(tdEchipaNoua);
      tr.appendChild(tdSuma);
      tr.appendChild(tdDelete);
      table.appendChild(tr);
    }
  } else {
    alert('No transfers');
  }
};

const searchTransfer = () => {
  const searchValue = dom('search').value.toLowerCase();

  const players = dom('transfers').childNodes;
  for (let i = 2; i < players.length; i++) {
    const playerName = players[i].childNodes[0].innerText.toLowerCase();
    if (playerName.includes(searchValue)) {
      players[i].style.display = '';
    } else {
      players[i].style.display = 'none';
    }
  }
};
//#endregion

// #region add transfer
const populateTransfersDropdown = async () => {
  const jucatori = (await getAllEntitiesServer('/getJucatori')).items;
  let dropdownJuc = dom('jucatori');
  for (let i = 0; i < jucatori.length; i++) {
    let option = document.createElement('option');
    option.id = jucatori[i].idJucator;
    option.innerHTML = jucatori[i].nume;
    dropdownJuc.appendChild(option);
  }

  const echipe = (await getAllEntitiesServer('/getEchipe')).items;
  let dropdownEchipe = dom('echipe');
  for (let i = 0; i < echipe.length; i++) {
    let option = document.createElement('option');
    option.id = echipe[i].idEchipa;
    option.innerHTML = echipe[i].nume;
    dropdownEchipe.appendChild(option);
  }
};

const addTransfer = async () => {
  const j = dom('jucatori');
  const idJucator = j.options[j.selectedIndex].id;
  const e = dom('echipe');
  const idEchipa = e.options[e.selectedIndex].id;
  const suma = parseInt(dom('pret').value);
  if (idJucator === 0 || idEchipa === 0 || isNaN(suma) || suma <= 0) {
    alert('Something wrong');
  } else {
    body = {
      idJucator,
      idEchipaNoua: idEchipa,
      pret: suma,
    };

    const result = await addEntityServer(body, '/addTransfer');
    if (result.status === 200) {
      window.location.href = '../html/transferuriList.html';
    }
  }
};
//#endregion

//#region delete Transfer
const deleteTransfer = async (id) => {
  await deleteEntityServer(id, '/deleteTransfer/');
  window.location.href = '../html/transferuriList.html';
};
//#endregion
//#endregion
//#endregion
