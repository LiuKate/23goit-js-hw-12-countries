import API from'./fetchCountries';
import debounce from 'lodash.debounce';
import fewCountriesTpl from '../templates/few_countries.hbs';
import oneCountryTpl from '../templates/one_country.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const cardConteinerRef = document.querySelector('.js-card-container');
const queryRef = document.querySelector('.input-search');
let searchQuery = '';

queryRef.addEventListener('input', debounce(onCountrySearch, 500));

function onCountrySearch(event) {
    event.preventDefault();

    searchQuery = event.target.value;

    clearCountriesMarkUp();

    API.fetchCountries(searchQuery).then(countryMarkup).catch(clearCountriesMarkUp)
    
}

function countryMarkup(countries) {

    const oneCountryMarkup = oneCountryTpl(countries);
    const fewCountriesMarkup = fewCountriesTpl(countries);

    if (countries.length === 1) {
        cardConteinerRef.insertAdjacentHTML('afterbegin', oneCountryMarkup);
        queryRef.value = '';
        return;
    }
    if (countries.length > 1 && countries.length <= 10) {
        cardConteinerRef.insertAdjacentHTML('afterbegin', fewCountriesMarkup);
        return;
    }
    if (countries.length > 10) {
        error({text: "Too many matches found. Please enter a more specific query!", delay: 1500,});
    }
}
  
function clearCountriesMarkUp() {
  cardConteinerRef.innerHTML= '';
}