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
