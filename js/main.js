const $baseCurrency = document.querySelector('.base-currency');
const baseCurrencyIndex = $baseCurrency.selectedIndex;
const baseCurrencyText =
  baseCurrencyIndex >= 0 ? $baseCurrency.options[baseCurrencyIndex].value : '';

const $exchangeCurrency = document.querySelector('.exchange-currency');
const exchangeCurrencyIndex = $exchangeCurrency.selectedIndex;
const exchangeCurrencyText =
  exchangeCurrencyIndex >= 0
    ? $exchangeCurrency.options[exchangeCurrencyIndex].value
    : '';

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

const $exchangeRate = document.querySelector('.exchange-rate');

getRate(baseCurrencyText, exchangeCurrencyText)
  .then((exchangeRate) => {
    $exchangeRate.textContent = exchangeRate;
  })
  .catch((error) => {
    console.error(error);
  });
