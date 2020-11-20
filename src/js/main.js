import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../services/exchange-service.js';

function clearFields() {
  $('#currency').val('');
  $('.show-errors').text('');
}

function displayExchange(currency, currencyType, USD, CAD, EUR, YEN, HKD, GBP) {
  $('.display-conversion').text(`The exchange rate of ${currency} ${currencyType}} is:`);
  $('.USD-conversion').text(`${USD * currency} in USD`);
  $('.CAD-conversion').text(`${CAD * currency} in CAD`);
  $('.EUR-conversion').text(`${EUR * currency} in EUR`);
  $('.YEN-conversion').text(`${YEN * currency} in YEN`);
  $('.HKD-conversion').text(`${HKD * currency} in HKD`);
  $('.GBP-conversion').text(`${GBP * currency} in GBP`);
  
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#money').submit(function(event) {
    event.preventDefault();
    let currency = parseInt($('#currency').val());
    let currencyType = $('input:radio[name=currency-type]:checked').val();
    clearFields();
    Exchange.exchangeMoney(currencyType)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(`ExchangeRate-API API error: ${exchangeResponse.message}`);
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
        displayErrors(error.message)
      })
  });
});