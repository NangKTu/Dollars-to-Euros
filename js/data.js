/* exported data */
let data = {
  entries: [],
};

function saveToLocalStorage() {
  localStorage.setItem('watchlistData', JSON.stringify(data));
}

window.addEventListener('beforeunload', saveToLocalStorage);

const previousData = localStorage.getItem('watchlistData');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
