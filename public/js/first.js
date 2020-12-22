// a shortcut for html element (dom = document object model)
const dom = (id) => document.getElementById(id);

// function clearLocalStorage() {
//     localStorage.clear();
// }

//#region ligi
//#region allLeagues
allLeaguesLoad = async () => {
  data = await getAllLeagues();
  console.log(data);
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

//#endregion
//#endregion

//#region jucatori
//#region allPlayers
allPlayersLoad = async () => {
  data = await getAllPlayers();
  console.log(data);
  console.log('Document', document);
  if (data.status == 200) {
    let ul = dom('players');
    const players = [...data.players];
    for (let i = 0; i < players.length; i++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = '../html/jucatorInfo.html?id=' + players[i].idJucator;
      a.innerHTML = players[i].nume;
      li.appendChild(a);
      ul.appendChild(li);
    }
  } else {
    console.log('EROARE');
    alert('No reports');
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
        console.log(xhr.response);
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

const onePlayerLoad = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let nume = dom('nume');
  let nationalitate = dom('nationalitate');
  let dataNastere = dom('dataNastere');
  let valoare = dom('valoare');
  let echipa = dom('echipa');
  console.log(id);
  let jucator = (await getOnePlayer(id)).player;
  console.log(jucator);
  nume.innerHTML += ' ' + jucator.nume;
  nationalitate.innerHTML += ' ' + jucator.nationalitate;
  let data = new Date(parseInt(jucator.dataNastere));
  dataNastere.innerHTML +=
    ' ' +
    data.getDate() +
    '/' +
    (data.getMonth() + 1) +
    '/' +
    data.getFullYear();

  valoare.innerHTML += ' ' + jucator.valoare;
};

//#endregion

//#region transferuri
//#region allTransfers
allTransfersLoad = async () => {
  data = await getAllTransfers();
  if (data.status == 200) {
    let table = dom('transfers');
    const transfers = [...data.transfers];
    console.log(transfers);
    for (let i = 0; i < transfers.length; i++) {
      let tr = document.createElement('tr');
      let tdNume = document.createElement('td');
      let tdEchipaVeche = document.createElement('td');
      let tdEchipaNoua = document.createElement('td');
      let tdSuma = document.createElement('td');

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
      table.appendChild(tr);
    }
  } else {
    console.log('EROARE');
    alert('No reports');
  }
};

getAllTransfers = () => {
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
    console.log('aici', result);
    window.location.href = '../html/transferuriList.html';
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
          resolve();
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
//#endregion

//#region teams
//#region allTeams
// allTeamsLoad = async () => {
//   data = await getAllPlayers();
//   console.log(data);
//   console.log('Document', document);
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
//     console.log('EROARE');
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
//#endregion
