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
  $('.display-conversion').text(`The exchange rate of ${currency} ${currency-type}}`)
}

$(document).ready(function() {
  $('#TODO-form').submit(function(event) {
    event.preventDefault();
    let currency = $('#currency').val();
    let currencyType = $('input:radio[name=currency-type]:checked').val();
  });
});