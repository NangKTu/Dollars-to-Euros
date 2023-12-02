const $baseCurrency = document.querySelector('.base-currency');
const $baseCurrencyRate = document.querySelector('.base-currency-rate');
const $exchangeCurrency = document.querySelector('.exchange-currency');
const $exchangeRate = document.querySelector('.exchange-rate');

const $addToWatchlistBtn = document.getElementById('add-button');
const $watchlist = document.getElementById('watchlist');

const $homeBtn = document.getElementById('house');
const $watchlistBtn = document.getElementById('eye');
const $homepage = document.getElementById('home-page');
const $watchlistPage = document.getElementById('watchlist-page');

function getRate(currency1, currency2) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/' +
        currency1 +
        '/' +
        currency2 +
        '.json',
    );
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        const response = xhr.response;
        for (const key in response) {
          if (key.toLowerCase() === currency2.toLowerCase()) {
            const exchangeRate = response[key];
            resolve(exchangeRate);
            return;
          }
        }
        // If no matching targetCurrency is found
        reject('Target currency not found in the API response');
      } else {
        reject('Error fetching data. Status: ' + xhr.status);
      }
    });
    xhr.send();
  });
}

function updateExchangeRate() {
  const baseCurrencyText = $baseCurrency.value;
  const exchangeCurrencyText = $exchangeCurrency.value;

  getRate(baseCurrencyText, exchangeCurrencyText)
    .then((exchangeRate) => {
      $exchangeRate.textContent = exchangeRate;
    })
    .catch((error) => {
      console.error(error);
    });
}

$baseCurrency.addEventListener('change', updateExchangeRate);
$exchangeCurrency.addEventListener('change', updateExchangeRate);

// Initial update based on default values
updateExchangeRate();

function saveWatchlistData(bcText, bcRate, exText, exRateText) {
  console.log('function fires as expected');
  const watchlistData = {
    bcText,
    bcRate,
    exText,
    exRateText,
  };
  data.entries.push(watchlistData);
}

$addToWatchlistBtn.addEventListener('click', addToWatchlist);

function addToWatchlist() {
  const bcText = $baseCurrency.value;
  const bcRate = $baseCurrencyRate.textContent;
  const exText = $exchangeCurrency.value;
  const exRateText = $exchangeRate.textContent;

  saveWatchlistData(bcText, bcRate, exText, exRateText);
}

function renderEntry(entry) {
  const listItem = document.createElement('li');
  const listContent = document.createElement('div');
  const sourceElement = document.createElement('p');
  const exchangeElement = document.createElement('p');

  sourceElement.textContent = `${entry.bcText}:   ${entry.bcRate}`;
  exchangeElement.textContent = `${entry.exText}:   ${entry.exRateText}`;

  listContent.appendChild(sourceElement);
  listContent.appendChild(exchangeElement);
  listItem.appendChild(listContent);

  return listItem;
}

function updateView(viewName) {
  console.log('function fired');
  console.log(viewName);
  if (viewName === 'homepage') {
    $homepage.classList.remove('hidden');
    $watchlistPage.classList.add('hidden');
  } else if (viewName === 'watchlist-page') {
    console.log('here');
    $watchlistPage.classList.remove('hidden');
    $homepage.classList.add('hidden');
    renderEntry();
  }
}

function switchToHomepage() {
  data.currentView = 'homepage';
  updateView('homepage');
}

function switchToWatchlist() {
  data.currentView = 'watchlist-page';
  updateView('watchlist-page');
}

document.addEventListener('DOMContentLoaded', function (e) {
  $watchlist.innerHTML = '';
  for (let i = 0; i < data.entries.length; i++) {
    const entry = data.entries[i];
    const renderedEntry = renderEntry(entry);
    $watchlist.appendChild(renderedEntry);
  }
  // Event listener for home button
  $homeBtn.addEventListener('click', switchToHomepage);
  // Event listener for watchlist button
  $watchlistBtn.addEventListener('click', switchToWatchlist);
});
