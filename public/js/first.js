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

//#region getOneLeague

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
      tdNume.innerHTML = transfers[i].numeJucator;
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
const populateTransfersDropdown = () => {};

const addTransfer = () => {};
//#endregion
//#endregion
