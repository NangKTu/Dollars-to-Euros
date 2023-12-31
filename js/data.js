/* exported data */
let data = {
  entries: [],
  currentView: 'home-page',
};

function saveToLocalStorage() {
  localStorage.setItem('watchlistData', JSON.stringify(data));
}

window.addEventListener('beforeunload', saveToLocalStorage);

const previousData = localStorage.getItem('watchlistData');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
