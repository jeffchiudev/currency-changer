import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../services/exchange-service.js';

function clearFields() {
  $('#currency').val('');
  $('.show-errors').text('');
}

function displayExchange(response) {
  $('.display-conversion').text(`The exchange rate of ${currency} ${currency-type}} is:`);
  $('.USD-conversion').text(`${USDexchangeReturn} in USD`);
  $('.CAD-conversion').text(`${CADexchangeReturn} in CAD`);
  $('.EUR-conversion').text(`${EURexchangeReturn} in EUR`);
  $('.YEN-conversion').text(`${YENexchangeReturn} in YEN`);
  $('.HKD-conversion').text(`${HKDexchangeReturn} in HKD`);
  $('.GBP-conversion').text(`${GBPexchangeReturn} in GBP`);
  
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#money').submit(function(event) {
    event.preventDefault();
    let currency = $('#currency').val();
    let currency-type = $('input:radio[name=currency-type]:checked').val();
    clearFields();
    Exchange.exchangeMoney(currency)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(`ExchangeRate-API API error: ${exchangeResponse.message}`);
        }
        const USDexchangeReturn = exchangeResponse.USD
        const CADexchangeReturn = exchangeResponse.CAD;
        const EURexchangeReturn = exchangeResponse.EUR;
        const JPYexchangeReturn = exchangeResponse.JPY
        const HKDexchangeReturn = exchangeResponse.HKD
        const GBPexchangeReturn = exchangeResponse.GBP
        
        displayExchange(CANexchangeReturn);
      })
      .catch(function(error) {
        displayErrors(error.message)
      })
  });
});