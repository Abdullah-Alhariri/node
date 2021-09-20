/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapbox';

// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');

// Checking if map id exist, if so render the map
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

// Values
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    console.log(email, password);
    e.preventDefault();
    login(email, password);
  });
}
