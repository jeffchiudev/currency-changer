import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import Exchange from '../services/exchange-service.js';

function clearFields() {
  $('.show-errors').text('');
}

function displayExchange(currency, currencyType, USD, CAD, EUR, YEN, HKD, GBP) {
  $('.display-conversion').text(`The exchange rate of ${currency} ${currencyType} is:`);
  $('.USD-conv').text(`${(USD * currency).toFixed(2)} in USD`);
  $('.CAD-conv').text(`${(CAD * currency).toFixed(2)} in CAD`);
  $('.EUR-conv').text(`${(EUR * currency).toFixed(2)} in EUR`);
  $('.YEN-conv').text(`${(YEN * currency).toFixed(2)} in YEN`);
  $('.HKD-conv').text(`${(HKD * currency).toFixed(2)} in HKD`);
  $('.GBP-conv').text(`${(GBP * currency).toFixed(2)} in GBP`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#money').click(function(event) {
    let currency = parseInt($('#currency').val());
    let currencyType = $('input:radio[name=currency-type]:checked').val();
    clearFields();
    Exchange.exchangeMoney(currencyType)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(`ExchangeRate-API API error: ${exchangeResponse}`);
        }
        const USDex = exchangeResponse.conversion_rates.USD;
        const CADex = exchangeResponse.conversion_rates.CAD;
        const EURex = exchangeResponse.conversion_rates.EUR;
        const JPYex = exchangeResponse.conversion_rates.JPY;
        const HKDex = exchangeResponse.conversion_rates.HKD;
        const GBPex = exchangeResponse.conversion_rates.GBP;
        displayExchange(currency, currencyType, USDex, CADex, EURex, JPYex, HKDex, GBPex);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
    event.preventDefault();
  });
});