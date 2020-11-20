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
  $('.USD-conversion').text(`${(USD * currency).toFixed(2)} in USD`);
  $('.CAD-conversion').text(`${(CAD * currency).toFixed(2)} in CAD`);
  $('.EUR-conversion').text(`${(EUR * currency).toFixed(2)} in EUR`);
  $('.YEN-conversion').text(`${(YEN * currency).toFixed(2)} in YEN`);
  $('.HKD-conversion').text(`${(HKD * currency).toFixed(2)} in HKD`);
  $('.GBP-conversion').text(`${(GBP * currency).toFixed(2)} in GBP`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#money').click(function(event) {
    let currency = parseInt($('#currency').val());
    //console.log(currency)
    let currencyType = $('input:radio[name=currency-type]:checked').val();
    //console.log(currencyType)
    clearFields();
    Exchange.exchangeMoney(currencyType)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(`ExchangeRate-API API error: ${exchangeResponse}`);
        }
        const USDexchangeReturn = exchangeResponse.conversion_rates.USD;
        const CADexchangeReturn = exchangeResponse.conversion_rates.CAD;
        const EURexchangeReturn = exchangeResponse.conversion_rates.EUR;
        const JPYexchangeReturn = exchangeResponse.conversion_rates.JPY;
        const HKDexchangeReturn = exchangeResponse.conversion_rates.HKD;
        const GBPexchangeReturn = exchangeResponse.conversion_rates.GBP;
        displayExchange(currency, currencyType, USDexchangeReturn, CADexchangeReturn, EURexchangeReturn, JPYexchangeReturn, HKDexchangeReturn, GBPexchangeReturn);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
    event.preventDefault();
  });
});