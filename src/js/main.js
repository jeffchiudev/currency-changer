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
  $('.USD-conv').html(`<strong>$${(USD * currency).toFixed(2)}</strong> in USD`);
  $('.CAD-conv').html(`<strong>$${(CAD * currency).toFixed(2)}</strong> in CAD`);
  $('.EUR-conv').html(`<strong>€${(EUR * currency).toFixed(2)}</strong> in EUR`);
  $('.YEN-conv').html(`<strong>¥${(YEN * currency).toFixed(2)}</strong> in YEN`);
  $('.HKD-conv').html(`<strong>$${(HKD * currency).toFixed(2)}</strong> in HKD`);
  $('.GBP-conv').html(`<strong>£${(GBP * currency).toFixed(2)}</strong> in GBP`);
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