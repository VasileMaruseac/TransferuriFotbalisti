// a shortcut for html element (dom = document object model)
const dom = (id) => document.getElementById(id);

//#region ligi
//#region addLeague
const addLeague = async () => {
  const nume = dom('nume').value;
  const tara = dom('tara').value;
  body = {
    nume,
    tara,
  };

  const result = await addLeagueServer(body);
  if (result.status === 200) {
    window.location.href = '../html/leaguesList.html';
  }
};

const addLeagueServer = (body) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/createLiga');
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
          dom('message').innerHTML = 'Success. League is saved.';
          resolve({
            status: this.status,
            statusText: xhr.statusText,
          });
          // if status is not ok
          // display error message and the response from server
        } else {
          dom('message').innerHTML =
            'Error. League is not saved. ' + xhr.responseText;
        }
      }
    };
  });
};
//#endregion

//#region allLeagues
allLeaguesLoad = async () => {
  data = await getAllLeagues();
  if (data.status == 200) {
    let ul = dom('leagues');
    const leagues = [...data.leagues];
    for (let i = 0; i < leagues.length; i++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = '../html/leagueInfo.html?id=' + leagues[i].idLiga;
      a.innerHTML = leagues[i].nume;
      li.appendChild(a);
      ul.appendChild(li);
    }
  } else {
    alert('No reports');
  }
};

getAllLeagues = () => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getLigi');
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          leagues: JSON.parse(xhr.response),
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
//#endregion

//#region getOneLeague
const oneLeagueLoad = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  data = await getOneLeague(id);
  if (data.status == 200) {
    const league = data.league;
    const nume = dom('nume');
    nume.innerHTML += league.nume;
    const tara = dom('tara');
    tara.innerHTML += league.tara;
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

const getOneLeague = (id) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getLiga/' + id);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          league: JSON.parse(xhr.response),
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

//#endregion

//#region updateLeague
const populateInputsUpdateLeague = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let league = (await getOneLeague(id)).league;

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
  await updateLeagueServer(body, idLiga);
  window.location.href = '../html/leagueInfo.html?id=' + idLiga;
};

const updateLeagueServer = (body, id) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/updateLiga/' + id);
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
          dom('message').innerHTML = 'Success. Liga actualizata.';
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
//#endregion

//#region jucatori
//#region allPlayers
allPlayersLoad = async () => {
  data = await getAllPlayers();
  if (data.status == 200) {
    let table = dom('players');
    const players = [...data.players];
    for (let i = 0; i < players.length; i++) {
      let tr = document.createElement('tr');
      let tdNume = document.createElement('td');
      let link = document.createElement('a');
      link.href = '../html/jucatorInfo.html?id=' + players[i].idJucator;
      link.innerHTML = players[i].nume;
      tdNume.appendChild(link);

      let tdEchipa = document.createElement('td');
      tdEchipa.innerHTML = players[i].numeEchipa;

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

getAllPlayers = () => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getJucatori');
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          players: JSON.parse(xhr.response),
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
//#endregion

//#region getOnePlayer
const getOnePlayer = (id) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getJucator/' + id);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          player: JSON.parse(xhr.response),
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

const onePlayerLoad = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let nume = dom('nume');
  let nationalitate = dom('nationalitate');
  let dataNastere = dom('dataNastere');
  let valoare = dom('valoare');
  let echipa = dom('echipa');
  let jucator = (await getOnePlayer(id)).player;
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
  let jucator = (await getOnePlayer(id)).player;

  const echipe = (await getAllTeams()).teams;
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
  console.log(idEchipa, typeof idEchipa, !idEchipa);
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
    await updateJucatorServer(body, idJucator);
    window.location.href = '../html/jucatorInfo.html?id=' + idJucator;
  }
};

const updateJucatorServer = (body, id) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/updateJucator/' + id);
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
          dom('message').innerHTML = 'Success. Jucator actualizat.';
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
//#endregion

//#region delete Jucator
const deleteJucator = async (id) => {
  await deleteJucatorServer(id);
  window.location.href = '../html/jucatoriList.html';
};

const deleteJucatorServer = (id) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/deleteJucator/' + id);
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
//#endregion
//#endregion

//#region transferuri
//#region allTransfers
const allTransfersLoad = async () => {
  data = await getAllTransfers();
  if (data.status == 200) {
    let table = dom('transfers');
    const transfers = [...data.transfers];
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

      tdEchipaVeche.innerHTML = transfers[i].numeEchipaVeche;
      tdEchipaNoua.innerHTML = transfers[i].numeEchipaNoua;
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

const getAllTransfers = () => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getTransfers');
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          transfers: JSON.parse(xhr.response),
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
//#endregion

// #region add transfer
const populateTransfersDropdown = async () => {
  const jucatori = (await getAllPlayers()).players;
  let dropdownJuc = dom('jucatori');
  for (let i = 0; i < jucatori.length; i++) {
    let option = document.createElement('option');
    option.id = jucatori[i].idJucator;
    option.innerHTML = jucatori[i].nume;
    dropdownJuc.appendChild(option);
  }

  const echipe = (await getAllTeams()).teams;
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

    const result = await addTransferServer(body);
    if (result.status === 200) {
      window.location.href = '../html/transferuriList.html';
    }
  }
};

const addTransferServer = (body) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/addTransfer');
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
          dom('message').innerHTML = 'Success. Transfer is saved.';
          resolve({
            status: this.status,
            statusText: xhr.statusText,
          });
          // if status is not ok
          // display error message and the response from server
        } else {
          dom('message').innerHTML =
            'Error. User is not saved. ' + xhr.responseText;
        }
      }
    };
  });
};
//#endregion

//#region delete Transfer
const deleteTransfer = async (id) => {
  await deleteTransferServer(id);
  window.location.href = '../html/transferuriList.html';
};

const deleteTransferServer = (id) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/deleteTransfer/' + id);
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
//#endregion
//#endregion

//#region teams
//#region allTeams
// allTeamsLoad = async () => {
//   data = await getAllPlayers();
//   if (data.status == 200) {
//     let ul = dom('players');
//     const players = [...data.players];
//     for (let i = 0; i < players.length; i++) {
//       let li = document.createElement('li');
//       let a = document.createElement('a');
//       a.href = '../html/jucatorInfo.html?id=' + players[i].idJucator;
//       a.innerHTML = players[i].nume;
//       li.appendChild(a);
//       ul.appendChild(li);
//     }
//   } else {
//     alert('No reports');
//   }
// };

getAllTeams = () => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getEchipe');
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          teams: JSON.parse(xhr.response),
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
//#endregion

//#region getOneTeam
const getOneTeam = (id) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getEchipa/' + id);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
          player: JSON.parse(xhr.response)[0],
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
//#endregion

//#region delete team
const deleteEchipa = (id) => {};
//#endregion
//#endregion
