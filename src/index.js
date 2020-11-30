import './styles.css';
import API from'./js/fetchCountries.js';
import debounce from 'lodash.debounce';
import fewCountriesTpl from './templates/few_countries.hbs';
import oneCountryTpl from './templates/one_country.hbs';

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

    API.fetchCountries(searchQuery).then(countryMarkup)     
    
}

function countryMarkup(countries) {

    if (countries.length === 1) {
        oneCountryMarkup(countries);
        clearQueryField();
        return;
    }
    if (countries.length > 1 && countries.length <= 10) {
        fewCountriesMarkup(countries);
        return;
    }
    if (countries.length > 10) {
        error({text: "Too many matches found. Please enter a more specific query!", delay: 1500,});
    }
}

  
function oneCountryMarkup(countries) {
    const oneCountryMarkup = oneCountryTpl(countries);

    cardConteinerRef.insertAdjacentHTML('afterbegin', oneCountryMarkup);
            
}
        
function fewCountriesMarkup(countries) {
    const fewCountriesMarkup = fewCountriesTpl(countries);

    cardConteinerRef.insertAdjacentHTML('afterbegin', fewCountriesMarkup);
}

function clearCountriesMarkUp() {
  cardConteinerRef.innerHTML= '';
}

function clearQueryField() {
  queryRef.value = '';
}

    
    
  

// //////////////////////////////////////////////////////////////////////
